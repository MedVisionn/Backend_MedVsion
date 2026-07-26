/**
 * @interface DoctorRepository
 */
class DoctorRepository {
  async create(doctorData) { throw new Error('Not implemented'); }
  async findAll() { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async update(id, doctorData) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
}

export default DoctorRepository;
