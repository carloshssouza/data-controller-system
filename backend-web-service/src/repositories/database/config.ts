import { mongoose } from '../../types/mongoose'

class Database {
  public connect () {
    mongoose.set('strictQuery', true)
    const url = process.env.MONGO_URL
    mongoose.connect(url).then(() => console.log('Connected to Mongodb')).catch((err) => console.log(err))
  }
}

export default new Database()
