import express from 'express';
import { services } from '../config/services.js';
import { createTargetProxy } from '../proxy/proxyFactory.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Here we can apply authMiddleware to specific routes if needed
router.use('/offices', createTargetProxy(services.office, 'Office'));
router.post('/doctors', createTargetProxy(services.doctor, 'Doctor'));
// e.g. router.use('/auth', createTargetProxy(services.auth, 'Auth'));

export default router;
