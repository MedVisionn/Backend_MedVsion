import express from 'express';
import cors from 'cors';
import officeRoutes from './infrastructure/web/routes/officeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/offices', officeRoutes);

// Error Handling Middleware (basic)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

export default app;
