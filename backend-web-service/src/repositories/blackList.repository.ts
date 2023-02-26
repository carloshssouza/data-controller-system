import { CreateRevokedToken } from '../interfaces/blackList'
import BlackList from './schemas/BlackList'

class BlackListRepository {
  public createRevokedToken (data: CreateRevokedToken) {
    return BlackList.create(data)
  }

  public getRevokedToken (token: string) {
    return BlackList.findOne({ token })
  }
}

export default new BlackListRepository()
