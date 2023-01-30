import { Express, express } from './types/express'
import cors from 'cors'
import morgan from 'morgan'
import Database from './repositories/database/config'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'
import dotenv from 'dotenv'
import {
  ApiRoutes,
  LoginRoutes,
  UserRoutes,
  ErrorLogRoutes
} from './routes'
dotenv.config()

class App {
  public express: Express

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  }

  private database (): void {
    Database.connect()
  }

  private routes (): void {
    this.express.use(process.env.PREFIX, ApiRoutes)
    this.express.use(process.env.PREFIX, LoginRoutes)
    this.express.use(process.env.PREFIX, UserRoutes)
    this.express.use(process.env.PREFIX, ErrorLogRoutes)
  }
}

export default new App().express
