import medicalHistoryService from '../../../application/useCases/medicalHistoryService.js';

class MedicalHistoryController {
  async createMedicalHistory(req, res) {
    try {
      const medicalHistory = await medicalHistoryService.createMedicalHistory(req.body);
      res.status(201).json({ success: true, data: medicalHistory });
    } catch (error) {
      if (error.message === 'patient_id is required') {
        return res.status(400).json({ success: false, message: error.message });
      }
      if (error.message === 'Patient not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getMedicalHistories(req, res) {
    try {
      const medicalHistories = await medicalHistoryService.getAllMedicalHistories();
      res.status(200).json({ success: true, data: medicalHistories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getMedicalHistoriesByPatient(req, res) {
    try {
      const medicalHistories = await medicalHistoryService.getMedicalHistoriesByPatientId(req.params.patientId);
      res.status(200).json({ success: true, data: medicalHistories });
    } catch (error) {
      if (error.message === 'Patient not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getMedicalHistory(req, res) {
    try {
      const medicalHistory = await medicalHistoryService.getMedicalHistoryById(req.params.id);
      res.status(200).json({ success: true, data: medicalHistory });
    } catch (error) {
      if (error.message === 'Medical history not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateMedicalHistory(req, res) {
    try {
      const medicalHistory = await medicalHistoryService.updateMedicalHistory(req.params.id, req.body);
      res.status(200).json({ success: true, data: medicalHistory });
    } catch (error) {
      if (error.message === 'Medical history not found' || error.message === 'Patient not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteMedicalHistory(req, res) {
    try {
      await medicalHistoryService.deleteMedicalHistory(req.params.id);
      res.status(200).json({ success: true, message: 'Medical history deleted successfully' });
    } catch (error) {
      if (error.message === 'Medical history not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new MedicalHistoryController();
