import bcrypt from 'bcrypt'

class Encrypter {
  /**
   *
   * @param data Password data
   * @param hash Password hash
   * @returns Returns boolean
   */
  async compare (data: any, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash)
  }

  /**
   *
   * @param data Password to be encrypt
   * @returns Returns the password encrypted
   */
  async hash (data: any): Promise<string> {
    return bcrypt.hash(data, 8)
  }
}

export default new Encrypter()
