import doctorRepository from '../../infrastructure/database/prismaDoctorRepository.js';

class DoctorService {
  async createDoctor(doctorData) {
    if (!doctorData.email || !doctorData.passwordHash || !doctorData.firstName || !doctorData.lastName) {
      throw new Error('Missing required fields');
    }
    return await doctorRepository.create(doctorData);
  }

  async getAllDoctors() {
    return await doctorRepository.findAll();
  }

  async getDoctorById(id) {
    const doctor = await doctorRepository.findById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }

  async updateDoctor(id, doctorData) {
    const existing = await doctorRepository.findById(id);
    if (!existing) {
      throw new Error('Doctor not found');
    }
    return await doctorRepository.update(id, doctorData);
  }

  async deleteDoctor(id) {
    const existing = await doctorRepository.findById(id);
    if (!existing) {
      throw new Error('Doctor not found');
    }
    return await doctorRepository.delete(id);
  }
}

export default new DoctorService();
