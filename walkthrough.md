# MedVision Microservices — Architecture Report

## 1. Overview

The backend uses two independent infrastructure tools working side by side:

| Tool | Role | Protocol |
|---|---|---|
| **Consul** | Service Registry & Discovery | HTTP REST API |
| **RabbitMQ** | Async Event Messaging | AMQP (TCP) |

They **do not communicate with each other** — they solve different problems:
- Consul answers: *"Where is service X running?"*
- RabbitMQ answers: *"How does service X notify service Y of an event?"*

---

## 2. Consul — Service Registry

### How it works

```
┌─────────────────────┐        ┌──────────────────┐
│   doctor-service    │──────▶│   Consul Agent   │
│   (port 3001)       │ POST   │   (port 8500)    │
│   on startup        │ /v1/   │                  │
└─────────────────────┘ agent  └──────────────────┘
                       /service        ▲
┌─────────────────────┐ /register      │ GET /v1/catalog
│   auth-service      │──────▶ ───────┘ /service/nodes
│   (port 3002)       │
└─────────────────────┘
                                        │ returns [{address, port}]
                                        ▼
┌─────────────────────┐        ┌──────────────────┐
│   api-gateway       │◀───────│  proxyFactory.js  │
│   (port 8000)       │  route │  getServiceUrl()  │
└─────────────────────┘        └──────────────────┘
```

### Step-by-step

**Step 1 — Service Registers (on startup)**

Each service calls `registerService()` from `shared/registry/index.js`:

```js
// inside server.js of each service
await registerService('doctor-service', 3001);
```

This calls the Consul HTTP API:
```
POST http://localhost:8500/v1/agent/service/register
Body: { id: "doctor-service-3001", name: "doctor-service", address: "localhost", port: 3001 }
```

**Step 2 — API Gateway Discovers and Proxies**

When a request arrives at the API Gateway (`GET /api/doctors`), the proxy dynamically resolves the real service address:

```js
// proxyFactory.js
const url = await getServiceUrl('doctor-service');
// → calls GET http://localhost:8500/v1/catalog/service/doctor-service
// → returns "http://localhost:3001"
// → request is forwarded there
```

**Step 3 — Graceful Deregistration (on shutdown)**

When a service process is killed (`Ctrl+C` → `SIGINT`), it automatically removes itself from Consul:
```
PUT http://localhost:8500/v1/agent/service/deregister/doctor-service-3001
```

---

## 3. RabbitMQ — Event Messaging

### How it works

```
┌──────────────────────┐
│   doctor-service     │
│   createDoctor()     │
│         │            │
│   publishDoctorCreated()
│         │            │
└─────────┼────────────┘
          │ publish(exchange, routingKey, payload)
          │
          ▼
┌──────────────────────────────────────┐
│          RabbitMQ Broker              │
│                                      │
│  Exchange: medvision.domain.events   │
│  Type: topic                         │
│                                      │
│  Routing Key: doctor.created         │
│         │                            │
│         ▼                            │
│  Queue: auth.doctor.sync.queue  ─────┼──────┐
└──────────────────────────────────────┘      │
                                              │ consume
                                              ▼
                                  ┌───────────────────────┐
                                  │   auth-service         │
                                  │   DoctorEventConsumer  │
                                  │                        │
                                  │ handleDoctorCreated()  │
                                  │ → generate password    │
                                  │ → hash with bcrypt     │
                                  │ → save to AuthUser DB  │
                                  └───────────────────────┘
```

### Step-by-step

**Step 1 — Connection (lazy, on first use)**

`shared/messaging/rabbitmq.js` creates a single AMQP channel the first time it's needed:
```js
const connection = await amqp.connect('amqp://user:password@localhost:5672');
channel = await connection.createChannel();
```

**Step 2 — Doctor Service Publishes an Event**

When a new doctor is created via `POST /api/doctors`:
```js
// doctorService.js (use case)
const doctor = await doctorRepository.create(doctorData);
await publishDoctorCreated(doctor);  // ← fires event
```

`publishDoctorCreated()` calls `publish()` which:
1. Asserts a `topic` exchange named `medvision.domain.events`
2. Publishes a JSON payload with routing key `doctor.created`

**Step 3 — Auth Service Consumes the Event**

On startup, Auth Service calls `startConsumers()` which calls `subscribe()`:
1. Asserts the same exchange
2. Creates (or connects to) a durable queue `auth.doctor.sync.queue`
3. Binds that queue to the routing key `doctor.created`
4. Listens with `channel.consume()` — calls `handleDoctorCreated()` for each message

**Step 4 — Message Acknowledgement**

After the handler runs successfully → `channel.ack(msg)` removes it from the queue.
If the handler throws → `channel.nack(msg, false, false)` discards the message.

---

## 4. How to Run All Services

### Prerequisites

Make sure Docker is installed and running.

### Step 1 — Start Infrastructure

```bash
cd /home/bidjed/Documents/Microservices/Backend_MedVsion
docker-compose up -d
```

This starts:
- **RabbitMQ** → `localhost:5672` (AMQP) | `localhost:15672` (UI)
- **Consul** → `localhost:8500` (UI + API)

> Wait ~5 seconds for both containers to be ready before starting services.

### Step 2 — Start Services (separate terminals)

```bash
# Terminal 1 — Auth Service
cd services/auth-service
npm start
```

```bash
# Terminal 2 — Doctor Service
cd services/doctor-service
npm start
```

```bash
# Terminal 3 — API Gateway
cd api-gateway
npm start
```

### Expected Startup Logs

**Auth Service:**
```
Auth Service listening on port 3002
[Consul] Registered: auth-service-3002
[RabbitMQ] Connected
[RabbitMQ] Subscribed → auth.doctor.sync.queue (doctor.created)
```

**Doctor Service:**
```
Doctor Service is running on port 3001
[Consul] Registered: doctor-service-3001
```

**API Gateway:**
```
API Gateway is orchestrating traffic on port 8000
[Consul] Registered: api-gateway-8000
```

### Step 3 — Verify the System

**Check Consul UI:**
```
http://localhost:8500/ui
```
You should see `api-gateway`, `doctor-service`, `auth-service` listed.

**Check RabbitMQ UI:**
```
http://localhost:15672
Login: user / password
```
Under **Exchanges**: `medvision.domain.events`
Under **Queues**: `auth.doctor.sync.queue`

**Trigger the Full Event Flow:**
```bash
curl -X POST http://localhost:8000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{ "firstName": "John", "lastName": "Doe", "email": "john.doe@medvision.com" }'
```

**Expected Console Output in Auth Service:**
```
[RabbitMQ] Subscribed → auth.doctor.sync.queue (doctor.created)
[AuthService] doctor.created received for john.doe@medvision.com
[AuthService] Credentials created for john.doe@medvision.com
```

---

## 5. Shared Directory Structure
```
shared/
├── messaging/
│   ├── interfaces/
│   │   ├── IEventPublisher.js   ← Abstract interface
│   │   └── IEventSubscriber.js  ← Abstract interface
│   ├── rabbitmq.js              ← getChannel() singleton
│   ├── publisher.js             ← publish(exchange, key, msg)
│   ├── consumer.js              ← subscribe(exchange, queue, key, cb)
│   └── routing-keys.js         ← EXCHANGES, ROUTING_KEYS, QUEUES constants
└── registry/
    └── index.js                 ← registerService() + getServiceUrl()
```
