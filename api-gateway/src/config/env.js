import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 8000,
  CONSUL_HOST: process.env.CONSUL_HOST || 'localhost',
  CONSUL_PORT: process.env.CONSUL_PORT || 8500,
  SERVICES: {
    OFFICE_SERVICE: 'office-service',
    DOCTOR_SERVICE: 'doctor-service',
    AUTH_SERVICE: 'auth-service', 
  }
};
