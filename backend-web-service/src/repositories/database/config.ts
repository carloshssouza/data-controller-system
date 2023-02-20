import { mongoose } from '../../types/mongoose'

class Database {
  public async connect (url: string): Promise<boolean> {
    mongoose.set('strictQuery', true)

    return mongoose.connect(url)
      .then(() => {
        console.log('Connected to Mongodb')
        return true
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }
}

export default new Database()
