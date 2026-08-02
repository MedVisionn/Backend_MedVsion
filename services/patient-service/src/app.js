import express from 'express';
import cors from 'cors';
import patientRoutes from './infrastructure/web/routes/patientRoutes.js';
import medicalHistoryRoutes from './infrastructure/web/routes/medicalHistoryRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, service: 'patient-service' });
});

app.use('/api/patients', patientRoutes);
app.use('/api/medical-histories', medicalHistoryRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

export default app;
