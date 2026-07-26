import express from 'express';
import cors from 'cors';
import gatewayRoutes from './routes/gatewayRoutes.js';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(loggerMiddleware);

// Define API Gateway health check route
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API Gateway is running smoothly (Clean Architecture)' });
});

// Setup gateway routes
app.use('/api', gatewayRoutes);

// Apply Global Error Handler
app.use(errorHandler);

export default app;
