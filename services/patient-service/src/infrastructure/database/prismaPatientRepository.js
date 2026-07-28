import { PrismaClient } from '@prisma/client';
import PatientRepository from '../../domain/repositories/patientRepositoryInterface.js';
import Patient from '../../domain/entities/patient.js';

const prisma = new PrismaClient();

class PrismapatientRepository extends PatientRepository {
  async create(patientData) {
    const created = await prisma.patient.create({
      data: patientData
    });
    return new Patient(created);
  }

  async findAll() {
    const patients = await prisma.patient.findMany();
    return patients.map(patient => new Patient(patient));
  }

  async findById(id) {
    const patient = await prisma.patient.findUnique({
      where: { id }
    });
    if (!patient) return null;
    return new Patient(patient);
  }

  async update(id, patientData) {
    const updated = await prisma.patient.update({
      where: { id },
      data: patientData
    });
    return new Patient(updated);
  }

  async delete(id) {
    const deleted = await prisma.patient.delete({
      where: { id }
    });
    return new Patient(deleted);
  }
}

export default new PrismapatientRepository();
