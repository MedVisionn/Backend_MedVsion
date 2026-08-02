/**
 * @interface MedicalHistoryRepository
 */
class MedicalHistoryRepository {
  async create(medicalHistoryData) { throw new Error('Not implemented'); }
  async findAll() { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async findByPatientId(patientId) { throw new Error('Not implemented'); }
  async update(id, medicalHistoryData) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
}

export default MedicalHistoryRepository;
