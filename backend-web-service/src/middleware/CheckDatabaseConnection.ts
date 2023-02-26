import { Request, Response, NextFunction } from '../types/express'
import { mongoose } from '../types/mongoose'

class DatabaseConnection {
  public checkDbConnection = (req: Request, res: Response, next: NextFunction) => {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'Database connection not established', connection: false })
    }
    next()
  }
}

export default new DatabaseConnection()
