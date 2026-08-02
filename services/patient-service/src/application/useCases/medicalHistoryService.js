import medicalHistoryRepository from '../../infrastructure/database/prismaMedicalHistoryRepository.js';
import patientRepository from '../../infrastructure/database/prismaPatientRepository.js';

class MedicalHistoryService {
  async createMedicalHistory(medicalHistoryData) {
    if (!medicalHistoryData.patient_id) {
      throw new Error('patient_id is required');
    }

    const patient = await patientRepository.findById(medicalHistoryData.patient_id);
    if (!patient) {
      throw new Error('Patient not found');
    }

    return await medicalHistoryRepository.create(medicalHistoryData);
  }

  async getAllMedicalHistories() {
    return await medicalHistoryRepository.findAll();
  }

  async getMedicalHistoryById(id) {
    const medicalHistory = await medicalHistoryRepository.findById(id);
    if (!medicalHistory) {
      throw new Error('Medical history not found');
    }
    return medicalHistory;
  }

  async getMedicalHistoriesByPatientId(patientId) {
    const patient = await patientRepository.findById(patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }
    return await medicalHistoryRepository.findByPatientId(patientId);
  }

  async updateMedicalHistory(id, medicalHistoryData) {
    const existing = await medicalHistoryRepository.findById(id);
    if (!existing) {
      throw new Error('Medical history not found');
    }

    if (medicalHistoryData.patient_id) {
      const patient = await patientRepository.findById(medicalHistoryData.patient_id);
      if (!patient) {
        throw new Error('Patient not found');
      }
    }

    return await medicalHistoryRepository.update(id, medicalHistoryData);
  }

  async deleteMedicalHistory(id) {
    const existing = await medicalHistoryRepository.findById(id);
    if (!existing) {
      throw new Error('Medical history not found');
    }
    return await medicalHistoryRepository.delete(id);
  }
}

export default new MedicalHistoryService();
