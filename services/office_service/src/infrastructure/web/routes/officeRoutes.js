import { Router } from 'express';
import officeController from '../controllers/officeController.js';

const router = Router();

router.post('/', officeController.createOffice);
router.get('/', officeController.getOffices);
router.get('/:id', officeController.getOffice);
router.put('/:id', officeController.updateOffice);
router.delete('/:id', officeController.deleteOffice);

export default router;
