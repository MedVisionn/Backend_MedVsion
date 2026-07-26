export class AuthController {
  constructor(loginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }

      const token = await this.loginUseCase.execute(email, password);
      return res.status(200).json({ success: true, token, message: 'Login successful' });
    } catch (error) {
      console.error('[Auth Controller] Error:', error.message);
      return res.status(401).json({ success: false, message: error.message });
    }
  }
}
