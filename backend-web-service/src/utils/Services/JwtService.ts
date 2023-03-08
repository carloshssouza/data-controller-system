import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TypeId } from '../../types/mongoose'

dotenv.config()

export interface IToken {
  sub?: TypeId
  type?: string
  iat?: number
  exp?: number
  error?: boolean
  message?: string
  name?: string
}

class JwtService {
  /**
   * Method to encrypt the data
   * @param data Object to be transform in token
   * @returns Returns jwt token
   */
  generate (data: any) {
    return jwt.sign(data, process.env.SECRET_KEY || '', {
      expiresIn: '1h'
    })
  }
  /**
 * Method to decode a token
 * @param token Token to be decoded
 * @returns Returns token decoded
 */

  decode (token: string) {
    try {
      const decode = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY || '')
      return decode
    } catch (error) {
      return {
        error: true,
        message: error.message,
        name: error.name
      }
    }
  }
}

export default new JwtService()
