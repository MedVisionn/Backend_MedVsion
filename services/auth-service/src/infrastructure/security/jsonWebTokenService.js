import jwt from 'jsonwebtoken';
import { JwtServiceInterface } from '../../domain/services/jwtServiceInterface.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export class JsonWebTokenService extends JwtServiceInterface {
  generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}
