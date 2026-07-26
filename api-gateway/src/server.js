import app from './app.js';
import { ENV } from './config/env.js';
import { registerService } from '../../shared/registry/index.js';

const PORT = ENV.PORT;

app.listen(PORT, async () => {
  console.log(`API Gateway is orchestrating traffic on port ${PORT}`);
  await registerService('api-gateway', PORT);
});
