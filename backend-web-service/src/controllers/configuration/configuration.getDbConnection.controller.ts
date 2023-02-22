import { Request, Response } from '../../types/express'

class ConfigurationGetDbConnectionController {
  public async getDbConnection (req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({ message: 'Database connection established' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationGetDbConnectionController()
