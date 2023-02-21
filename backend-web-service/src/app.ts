import { Express, express } from './types/express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'
import dotenv from 'dotenv'
import {
  ApiRoutes,
  LoginRoutes,
  UserRoutes,
  ErrorLogRoutes,
  ConfigurationRoutes
} from './routes'
dotenv.config()

class App {
  public express: Express

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
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
  }
}

export default new App().express
