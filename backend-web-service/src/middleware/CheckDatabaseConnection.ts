import ErrorRes from '../utils/Erro'
import { Request, Response, NextFunction } from '../types/express'
import { mongoose } from '../types/mongoose'

class DatabaseConnection {
  public checkDbConnection = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        throw new ErrorRes(500, 'Database connection error')
      }
      next()
    } catch (error) {
      return res.status(error.status || 500).json({ connection: false, error: error.message })
    }
  }
}

export default new DatabaseConnection()
