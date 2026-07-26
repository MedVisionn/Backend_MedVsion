export class HashServiceInterface {
  async hash(plainText) {
    throw new Error('Method not implemented.');
  }

  async compare(plainText, hashedText) {
    throw new Error('Method not implemented.');
  }
}
