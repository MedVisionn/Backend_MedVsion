import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { registerService } from '../../../shared/registry/index.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`Doctor Service is running on port ${PORT}`);
    await registerService('doctor-service', PORT);
});
