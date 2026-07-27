import { PrismaClient } from '@prisma/client';
import DoctorRepository from '../../domain/repositories/doctorRepositoryInterface.js';
import Doctor from '../../domain/entities/doctor.js';

const prisma = new PrismaClient();

class PrismaDoctorRepository extends DoctorRepository {
  async create(doctorData) {
    console.log("doctorData", doctorData);
    const created = await prisma.doctor.create({
      data: doctorData
    });
    return new Doctor(created);
  }

  async findAll() {
    const doctors = await prisma.doctor.findMany();
    return doctors.map(doc => new Doctor(doc));
  }

  async findById(id) {
    const doctor = await prisma.doctor.findUnique({
      where: { id }
    });
    if (!doctor) return null;
    return new Doctor(doctor);
  }

  async findByEmail(email) {
    const doctor = await prisma.doctor.findUnique({
      where: { email }
    });
    if (!doctor) return null;
    return new Doctor(doctor);
  }

  async update(id, doctorData) {
    const updated = await prisma.doctor.update({
      where: { id },
      data: doctorData
    });
    return new Doctor(updated);
  }

  async delete(id) {
    const deleted = await prisma.doctor.delete({
      where: { id }
    });
    return new Doctor(deleted);
  }
}

export default new PrismaDoctorRepository();
