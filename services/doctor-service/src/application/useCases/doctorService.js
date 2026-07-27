import doctorRepository from '../../infrastructure/database/prismaDoctorRepository.js';
import { publishDoctorCreated } from '../../infrastructure/rabbitmq/DoctorEventPublisher.js';

class DoctorService {
  async createDoctor(doctorData) {
    // Basic null check before destructuring
    if (!doctorData?.email || !doctorData?.firstName || !doctorData?.lastName) {
      throw new Error('Missing required fields');
    }

    const { password, ...data } = doctorData;
    console.log("data ",data)
    console.log("password ",password)
    // 1. Create doctor record
    const doctor = await doctorRepository.create(data);
    console.log("created ",doctor)
    // 2. Publish event (do not leak plaintext passwords!)
    const eventPayload = {
      id: doctor.id,
      email: doctor.email,
      password:password,
      role: 'DOCTOR',
    };

    try {
      await publishDoctorCreated(eventPayload);
    } catch (error) {
      // Handle or log broker failures so DB operations aren't quietly orphaned
      console.error('Failed to publish DoctorCreated event:', error);
    }

    return doctor;
  }

  async getAllDoctors() {
    return await doctorRepository.findAll();
  }

  async getDoctorById(id) {
    const doctor = await doctorRepository.findById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }

  async updateDoctor(id, doctorData) {
    // Execute update directly; let repository/Prisma throw or return null if not found
    const updatedDoctor = await doctorRepository.update(id, doctorData);
    if (!updatedDoctor) {
      throw new Error('Doctor not found');
    }
    return updatedDoctor;
  }

  async deleteDoctor(id) {
    // Execute delete directly in 1 query
    const deletedDoctor = await doctorRepository.delete(id);
    if (!deletedDoctor) {
      throw new Error('Doctor not found');
    }
    return deletedDoctor;
  }
}

export default new DoctorService();