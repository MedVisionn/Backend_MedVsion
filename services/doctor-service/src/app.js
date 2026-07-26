import express from 'express';
import cors from 'cors';
import doctorRoutes from './infrastructure/web/routes/doctorRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/doctors', doctorRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Doctor Service is healthy' });
});

// Error Handling Middleware (basic)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

export default app;
