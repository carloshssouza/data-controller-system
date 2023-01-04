import bcrypt from 'bcrypt'

export default class Encrypter {
  async compare (data: any, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash)
  }

  async hash (data: any): Promise<string> {
    return bcrypt.hash(data, 8)
  }
}
