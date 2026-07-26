import { Router } from 'express';
import doctorController from '../controllers/doctorController.js';

const router = Router();

router.post('/', doctorController.createDoctor);
router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

export default router;
