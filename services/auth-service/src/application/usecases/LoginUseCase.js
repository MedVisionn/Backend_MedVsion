export class LoginUseCase {
  constructor(authRepository, hashService, jwtService) {
    this.authRepository = authRepository;
    this.hashService = hashService;
    this.jwtService = jwtService;
  }

  async execute(email, password) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await this.hashService.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    return this.jwtService.generateToken(payload);
  }
}
