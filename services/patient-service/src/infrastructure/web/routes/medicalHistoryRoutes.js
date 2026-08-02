import { Router } from 'express';
import medicalHistoryController from '../controllers/medicalHistoryController.js';

const router = Router();

router.post('/', medicalHistoryController.createMedicalHistory);
router.get('/', medicalHistoryController.getMedicalHistories);
router.get('/patient/:patientId', medicalHistoryController.getMedicalHistoriesByPatient);
router.get('/:id', medicalHistoryController.getMedicalHistory);
router.put('/:id', medicalHistoryController.updateMedicalHistory);
router.delete('/:id', medicalHistoryController.deleteMedicalHistory);

export default router;
