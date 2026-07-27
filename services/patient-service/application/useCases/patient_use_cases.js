import PatientRepository from '../../infrastructure/database/prismaPatientRepository.js';

class PatientService {
  async createPatient(PatientData) {
    if (!PatientData.name || !PatientData.logo_url) {
      throw new Error('Name and logo_url are required');
    }
    return await PatientRepository.create(PatientData);
  }

  async getAllPatients() {
    return await PatientRepository.findAll();
  }

  async getPatientById(id) {
    const Patient = await PatientRepository.findById(id);
    if (!Patient) {
      throw new Error('Patient not found');
    }
    return Patient;
  }

  async updatePatient(id, PatientData) {
    // Verify existence first
    const existing = await PatientRepository.findById(id);
    if (!existing) {
      throw new Error('Patient not found');
    }
    return await PatientRepository.update(id, PatientData);
  }

  async deletePatient(id) {
    // Verify existence first
    const existing = await PatientRepository.findById(id);
    if (!existing) {
      throw new Error('Patient not found');
    }
    return await PatientRepository.delete(id);
  }
}

export default new PatientService();
