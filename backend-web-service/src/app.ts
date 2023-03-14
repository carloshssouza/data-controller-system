import { Express, express } from './types/express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'
import dotenv from 'dotenv'
import FileService from './utils/Services/FileService'
import Database from './repositories/database/config'
import util from 'util'
import fs from 'fs'

import {
  ApiRoutes,
  LoginRoutes,
  UserRoutes,
  ErrorLogRoutes,
  ConfigurationRoutes,
  BlacklistRoutes
} from './routes'
dotenv.config()

class App {
  public express: Express

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
    this.databaseConnect()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  }

  private routes (): void {
    this.express.use(process.env.PREFIX || '/api', ApiRoutes)
    this.express.use(process.env.PREFIX || '/api', LoginRoutes)
    this.express.use(process.env.PREFIX || '/api', UserRoutes)
    this.express.use(process.env.PREFIX || '/api', ErrorLogRoutes)
    this.express.use(process.env.PREFIX || '/api', ConfigurationRoutes)
    this.express.use(process.env.PREFIX || '/api', BlacklistRoutes)
  }

  private async databaseConnect () {
    try {
      // File exists, so read it
      const mongoUrlHost = await FileService.readConfigFile('../../../db.connection.json')
      if (mongoUrlHost) {
        await Database.connect(mongoUrlHost)
      }
    } catch (error) {
      console.error(`Error checking for or reading file: ${error}`)
    }
  }
}

export default new App().express
