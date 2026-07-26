import { publish } from '../../../../../shared/messaging/publisher.js';
import { EXCHANGES, ROUTING_KEYS } from '../../../../../shared/messaging/routing-keys.js';

export async function publishDoctorCreated(doctor) {
    await publish(EXCHANGES.DOMAIN_EVENTS, ROUTING_KEYS.DOCTOR_CREATED, {
        id: doctor.id,
        email: doctor.email,
        password:doctor.password,
        role: 'DOCTOR'
    });
}
