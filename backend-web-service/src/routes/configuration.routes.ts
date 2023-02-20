import {
  ConfigurationCreateController,
  ConfigurationUpdateController,
  ConfigurationGetController
} from '../controllers/configuration'
import { Router } from '../types/express'
import Authenticate from 'src/middleware/Authenticate'

const routes = Router()

routes.post('/configuration/mongo-host', ConfigurationCreateController.createConfiguration)
routes.put('/configuration/app-host', Authenticate.authenticateAdmin, ConfigurationUpdateController.updateConfiguration)
routes.get('/configuration', Authenticate.authenticateCommon, ConfigurationGetController.getConfiguration)

export default routes
