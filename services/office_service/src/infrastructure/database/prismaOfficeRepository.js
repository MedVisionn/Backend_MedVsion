import { PrismaClient } from '@prisma/client';
import OfficeRepository from '../../domain/repositories/officeRepositoryInterface.js';
import Office from '../../domain/entities/office.js';

const prisma = new PrismaClient();

class PrismaOfficeRepository extends OfficeRepository {
  async create(officeData) {
    const created = await prisma.office.create({
      data: officeData
    });
    return new Office(created);
  }

  async findAll() {
    const offices = await prisma.office.findMany();
    return offices.map(office => new Office(office));
  }

  async findById(id) {
    const office = await prisma.office.findUnique({
      where: { id }
    });
    if (!office) return null;
    return new Office(office);
  }

  async update(id, officeData) {
    const updated = await prisma.office.update({
      where: { id },
      data: officeData
    });
    return new Office(updated);
  }

  async delete(id) {
    const deleted = await prisma.office.delete({
      where: { id }
    });
    return new Office(deleted);
  }
}

export default new PrismaOfficeRepository();
