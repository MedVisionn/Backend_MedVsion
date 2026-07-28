/**
 * @interface PatientRepository
 */
class PatientRepository {
  async create(patientData) { throw new Error('Not implemented'); }
  async findAll() { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async update(id, patientData) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
}

export default PatientRepository;
