import { Router } from 'express';
import patientController from '../controllers/patientController.js';

const router = Router();

router.post('/', patientController.createPatient);
router.get('/patients', patientController.getPatients);
router.get('/patients/:id', patientController.getPatient);
router.put('/patients/:id', patientController.updatePatient);
router.delete('patients/:id', patientController.deletePatient);

export default router;
