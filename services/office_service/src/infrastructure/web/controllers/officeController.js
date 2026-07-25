import officeService from '../../../application/useCases/officeService.js';

class OfficeController {
  async createOffice(req, res) {
    try {
      const office = await officeService.createOffice(req.body);
      res.status(201).json({ success: true, data: office });
    } catch (error) {
      if (error.message === 'Name and logo_url are required') {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOffices(req, res) {
    try {
      const offices = await officeService.getAllOffices();
      res.status(200).json({ success: true, data: offices });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getOffice(req, res) {
    try {
      const office = await officeService.getOfficeById(req.params.id);
      res.status(200).json({ success: true, data: office });
    } catch (error) {
      if (error.message === 'Office not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateOffice(req, res) {
    try {
      const office = await officeService.updateOffice(req.params.id, req.body);
      res.status(200).json({ success: true, data: office });
    } catch (error) {
      if (error.message === 'Office not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteOffice(req, res) {
    try {
      await officeService.deleteOffice(req.params.id);
      res.status(200).json({ success: true, message: 'Office deleted successfully' });
    } catch (error) {
      if (error.message === 'Office not found') {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new OfficeController();
