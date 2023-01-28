import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

class JwtService {
  /**
   * Method to encrypt the data
   * @param data Object to be transform in token
   * @returns Returns jwt token
   */
  generate (data: any) {
    return jwt.sign({ payload: data }, process.env.SECRET_KEY || '', {
      expiresIn: '1h'
    })
  }
  /**
 * Method to decode a token
 * @param token Token to be decoded
 * @returns Returns token decoded
 */

  decode (token: string) {
    const decode = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY || '')

    return decode
  }
}

export default new JwtService()
