import { PrismaClient } from '@prisma/client';
import { AuthRepositoryInterface } from '../../domain/repositories/authRepositoryInterface.js';

const prisma = new PrismaClient();

export class PrismaAuthRepository extends AuthRepositoryInterface {
  async findByEmail(email) {
    return await prisma.authUser.findUnique({
      where: { email }
    });
  }

  async saveUser(user) {
    return await prisma.authUser.create({
      data: user
    });
  }
}
