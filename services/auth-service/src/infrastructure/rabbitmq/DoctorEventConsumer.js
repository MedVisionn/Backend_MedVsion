import { subscribe } from '../../../../../shared/messaging/consumer.js';
import { EXCHANGES, ROUTING_KEYS, QUEUES } from '../../../../../shared/messaging/routing-keys.js';
import { SyncUserUseCase } from '../../application/usecases/SyncUserUseCase.js';
import { PrismaAuthRepository } from '../database/prismaAuthRepository.js';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';

const syncUserUseCase = new SyncUserUseCase(new PrismaAuthRepository());

async function handleDoctorCreated(payload) {
    console.log(`[AuthService] doctor.created received for ${payload.email}`);
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    await syncUserUseCase.execute(payload.id, payload.email, hashedPassword, payload.role || 'DOCTOR');
    console.log(`[AuthService] Credentials created for ${payload.email}`);
}

export async function startConsumers() {
    await subscribe(
        EXCHANGES.DOMAIN_EVENTS,
        QUEUES.AUTH_DOCTOR_SYNC,
        ROUTING_KEYS.DOCTOR_CREATED,
        handleDoctorCreated
    );
}
