import express from 'express';
import cors from 'cors';
import { PrismaAuthRepository } from './infrastructure/database/prismaAuthRepository.js';
import { BcryptHashService } from './infrastructure/security/bcryptHashService.js';
import { JsonWebTokenService } from './infrastructure/security/jsonWebTokenService.js';
import { LoginUseCase } from './application/usecases/LoginUseCase.js';
import { AuthController } from './infrastructure/web/controllers/authController.js';
import { createAuthRoutes } from './infrastructure/web/routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// 1. Dependency Injection setup
const authRepository = new PrismaAuthRepository();
const hashService = new BcryptHashService();
const jwtService = new JsonWebTokenService();

const loginUseCase = new LoginUseCase(authRepository, hashService, jwtService);
const authController = new AuthController(loginUseCase);

const authRoutes = createAuthRoutes(authController);

// 2. Mount Routes
app.use('/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Auth Service (Clean Architecture) is running' });
});

export default app;
