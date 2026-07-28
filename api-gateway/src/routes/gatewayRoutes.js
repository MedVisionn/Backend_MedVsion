import express from 'express';
import { services } from '../config/services.js';
import { createTargetProxy } from '../proxy/proxyFactory.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = express.Router();

// Here we can apply authMiddleware to specific routes if needed
router.use('/offices', createTargetProxy(services.office, 'Office'));
router.post('/doctors', createTargetProxy(services.doctor, 'Doctor'));
router.use('/auth', createTargetProxy(services.auth, 'Auth'));
router.use('/patients', authMiddleware, requireRole(['doctor', 'DOCTOR']), createTargetProxy(services.patient, 'Patient'));

export default router;
