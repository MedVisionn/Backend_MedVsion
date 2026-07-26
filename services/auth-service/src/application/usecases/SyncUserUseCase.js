export class SyncUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(id, email, password, role) {
    // Scaffold for saving a new user replicated from RabbitMQ
    const user = {
      id,
      email,
      password,
      role
    };
    return await this.authRepository.saveUser(user);
  }
}
