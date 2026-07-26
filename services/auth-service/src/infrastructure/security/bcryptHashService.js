import bcrypt from 'bcrypt';
import { HashServiceInterface } from '../../domain/services/hashServiceInterface.js';

export class BcryptHashService extends HashServiceInterface {
  async hash(plainText) {
    return await bcrypt.hash(plainText, 10);
  }

  async compare(plainText, hashedText) {
    return await bcrypt.compare(plainText, hashedText);
  }
}
