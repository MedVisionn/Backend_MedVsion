import { PrismaClient } from '@prisma/client';
import PatientRepository from '../../domain/repositories/patientRepositoryInterface.js';
import Patient from '../../domain/entities/patient.js';

const prisma = new PrismaClient();

class PrismapatientRepository extends PatientRepository {
  async create(patientData) {
    const created = await prisma.patient.create({
      data: patientData
    });
    return new patient(created);
  }

  async findAll() {
    const patients = await prisma.patient.findMany();
    return patients.map(patient => new patient(patient));
  }

  async findById(id) {
    const patient = await prisma.patient.findUnique({
      where: { id }
    });
    if (!patient) return null;
    return new patient(patient);
  }

  async update(id, patientData) {
    const updated = await prisma.patient.update({
      where: { id },
      data: patientData
    });
    return new patient(updated);
  }

  async delete(id) {
    const deleted = await prisma.patient.delete({
      where: { id }
    });
    return new patient(deleted);
  }
}

export default new PrismapatientRepository();
