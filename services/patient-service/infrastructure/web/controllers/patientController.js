import PatientService from '../../../application/useCases/patient_use_cases.js';

class PatientController {
  async createPatient(req, res) {
    try {
      const Patient = await PatientService.createPatient(req.body);
      res.status(201).json({ success: true, data: Patient });
    } catch (error) {
      if (error.message === 'Name and logo_url are required') {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getPatients(req, res) {
    try {
      const Patients = await PatientService.getAllPatients();
      res.status(200).json({ success: true, data: Patients });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getPatient(req, res) {
    try {
      const Patient = await PatientService.getPatientById(req.params.id);
      res.status(200).json({ success: true, data: Patient });
    } catch (error) {
      if (error.message === 'Patient not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updatePatient(req, res) {
    try {
      const Patient = await PatientService.updatePatient(req.params.id, req.body);
      res.status(200).json({ success: true, data: Patient });
    } catch (error) {
      if (error.message === 'Patient not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deletePatient(req, res) {
    try {
      await PatientService.deletePatient(req.params.id);
      res.status(200).json({ success: true, message: 'Patient deleted successfully' });
    } catch (error) {
      if (error.message === 'Patient not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PatientController();
