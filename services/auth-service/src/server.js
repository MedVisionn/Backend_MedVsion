import app from './app.js';
import dotenv from 'dotenv';
import { registerService } from '../../../shared/registry/index.js';
import { startConsumers } from './infrastructure/rabbitmq/DoctorEventConsumer.js';
dotenv.config();

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  console.log(`Auth Service listening on port ${PORT}`);
  
  await registerService('auth-service', PORT);
  await startConsumers();
});
