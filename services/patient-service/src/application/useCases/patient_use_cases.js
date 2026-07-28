import PatientRepository from '../../infrastructure/database/prismaPatientRepository.js';

class PatientService {
  async createPatient(PatientData) {
    if (!PatientData.doctor_id || !PatientData.first_name || !PatientData.last_name) {
      throw new Error('doctor_id, first_name, and last_name are required');
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
