/**
 * @interface OfficeRepository
 */
class OfficeRepository {
  async create(officeData) { throw new Error('Not implemented'); }
  async findAll() { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async update(id, officeData) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
}

export default OfficeRepository;
