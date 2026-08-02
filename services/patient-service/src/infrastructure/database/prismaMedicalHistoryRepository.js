import { PrismaClient } from '@prisma/client';
import MedicalHistoryRepository from '../../domain/repositories/medicalHistoryRepositoryInterface.js';
import MedicalHistory from '../../domain/entities/medicalHistory.js';

const prisma = new PrismaClient();

class PrismaMedicalHistoryRepository extends MedicalHistoryRepository {
  async create(medicalHistoryData) {
    const prismaData = {
      ...medicalHistoryData,
      history_id: medicalHistoryData.history_id ?? medicalHistoryData.id
    };

    if ('id' in prismaData) {
      delete prismaData.id;
    }

    const created = await prisma.patient_medical_history.create({
      data: prismaData
    });
    return new MedicalHistory(created);
  }

  async findAll() {
    const medicalHistories = await prisma.patient_medical_history.findMany();
    return medicalHistories.map(medicalHistory => new MedicalHistory(medicalHistory));
  }

  async findById(id) {
    const medicalHistory = await prisma.patient_medical_history.findUnique({
      where: { history_id: id }
    });
    if (!medicalHistory) return null;
    return new MedicalHistory(medicalHistory);
  }

  async findByPatientId(patientId) {
    const medicalHistories = await prisma.patient_medical_history.findMany({
      where: { patient_id: patientId }
    });
    return medicalHistories.map(medicalHistory => new MedicalHistory(medicalHistory));
  }

  async update(id, medicalHistoryData) {
    const prismaData = {
      ...medicalHistoryData,
      history_id: medicalHistoryData.history_id ?? medicalHistoryData.id
    };

    if ('id' in prismaData) {
      delete prismaData.id;
    }

    const updated = await prisma.patient_medical_history.update({
      where: { history_id: id },
      data: prismaData
    });
    return new MedicalHistory(updated);
  }

  async delete(id) {
    const deleted = await prisma.patient_medical_history.delete({
      where: { history_id: id }
    });
    return new MedicalHistory(deleted);
  }
}

export default new PrismaMedicalHistoryRepository();
