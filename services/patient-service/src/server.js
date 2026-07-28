import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { registerService } from '../../../shared/registry/index.js';
const PORT = process.env.PORT || 3003;

app.listen(PORT, async () => {
  console.log(`Patient service is running on port ${PORT}`);
  await registerService('patient-service', PORT);
});
