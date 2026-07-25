import officeRepository from '../../infrastructure/database/prismaOfficeRepository.js';

class OfficeService {
  async createOffice(officeData) {
    if (!officeData.name || !officeData.logo_url) {
      throw new Error('Name and logo_url are required');
    }
    return await officeRepository.create(officeData);
  }

  async getAllOffices() {
    return await officeRepository.findAll();
  }

  async getOfficeById(id) {
    const office = await officeRepository.findById(id);
    if (!office) {
      throw new Error('Office not found');
    }
    return office;
  }

  async updateOffice(id, officeData) {
    // Verify existence first
    const existing = await officeRepository.findById(id);
    if (!existing) {
      throw new Error('Office not found');
    }
    return await officeRepository.update(id, officeData);
  }

  async deleteOffice(id) {
    // Verify existence first
    const existing = await officeRepository.findById(id);
    if (!existing) {
      throw new Error('Office not found');
    }
    return await officeRepository.delete(id);
  }
}

export default new OfficeService();
