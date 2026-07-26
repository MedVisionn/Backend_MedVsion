import Consul from 'consul';

const consul = new Consul({
    host: process.env.CONSUL_HOST || 'localhost',
    port: process.env.CONSUL_PORT || 8500,
    promisify: true
});

export async function registerService(serviceName, servicePort) {
    const id = `${serviceName}-${servicePort}`;
    await consul.agent.service.register({
        id,
        name: serviceName,
        address: 'localhost',
        port: parseInt(servicePort, 10)
    });
    console.log(`[Consul] Registered: ${id}`);

    process.on('SIGINT', async () => {
        await consul.agent.service.deregister(id);
        console.log(`[Consul] Deregistered: ${id}`);
        process.exit(0);
    });
}

export async function getServiceUrl(serviceName) {
    const nodes = await consul.catalog.service.nodes(serviceName);
    if (!nodes || nodes.length === 0) return null;
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    return `http://${node.ServiceAddress}:${node.ServicePort}`;
}
