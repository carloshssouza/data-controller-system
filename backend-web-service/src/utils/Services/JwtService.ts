import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default class JwtService {
  generate (data: any) {
    return jwt.sign({ payload: data }, process.env.SECRET_KEY || '', {
      expiresIn: '1h'
    })
  }

  decode (token: string) {
    const decode = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY || '')

    return decode
  }
}
