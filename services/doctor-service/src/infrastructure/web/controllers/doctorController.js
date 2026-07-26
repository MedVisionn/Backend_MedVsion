import doctorService from '../../../application/useCases/doctorService.js';

class DoctorController {
  async createDoctor(req, res) {
    try {
      const doctor = await doctorService.createDoctor(req.body);
      res.status(201).json({ success: true, data: doctor });
    } catch (error) {
      if (error.message === 'Missing required fields') {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getDoctors(req, res) {
    try {
      const doctors = await doctorService.getAllDoctors();
      res.status(200).json({ success: true, data: doctors });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getDoctor(req, res) {
    try {
      const doctor = await doctorService.getDoctorById(req.params.id);
      res.status(200).json({ success: true, data: doctor });
    } catch (error) {
      if (error.message === 'Doctor not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateDoctor(req, res) {
    try {
      const doctor = await doctorService.updateDoctor(req.params.id, req.body);
      res.status(200).json({ success: true, data: doctor });
    } catch (error) {
      if (error.message === 'Doctor not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteDoctor(req, res) {
    try {
      await doctorService.deleteDoctor(req.params.id);
      res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
    } catch (error) {
      if (error.message === 'Doctor not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

}

export default new DoctorController();
