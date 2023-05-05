import ErrorRes from '../../utils/Erro'
import ConfigurationEntity from '../../entities/configuration/configuration.entity'
import { Request, Response } from '../../types/express'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'

class ConfigurationGetController {
  public async getConfiguration (req: Request, res: Response): Promise<Response> {
    try {
      const configuration = await ConfigurationEntity.getConfiguration()

      if (!configuration) {
        mongoose.connection.close()
        fs.unlinkSync(path.resolve(__dirname, '../../../db.connection.json'))
        throw new ErrorRes(404, 'Configuration not found')
      }

      return res.status(200).json(configuration)
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new ConfigurationGetController()
