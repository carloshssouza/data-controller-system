import {
  ConfigurationCreateController,
  ConfigurationUpdateController,
  ConfigurationGetController,
  ConfigurationGetDbConnectionController,
  ConfigurationGetAppHostConnectionController,
  ConfigurationStartProxyController
} from '../controllers/configuration'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'
import CheckDatabaseConnection from '../middleware/CheckDatabaseConnection'

const routes = Router()

routes.post('/configuration/mongo-host', ConfigurationCreateController.createConfiguration)
routes.put('/configuration/app-host', Authenticate.authenticateAdmin, ConfigurationUpdateController.updateConfiguration)
routes.get('/configuration', ConfigurationGetController.getConfiguration)
routes.get('/configuration/db-connection', CheckDatabaseConnection.checkDbConnection, ConfigurationGetDbConnectionController.getDbConnection)
routes.get('/configuration/app-host-connection', ConfigurationGetAppHostConnectionController.getConfiguration)
routes.get('/configuration/start-proxy', Authenticate.authenticateAdmin, ConfigurationStartProxyController.startProxy)

export default routes
