import {
  ConfigurationCreateController,
  ConfigurationUpdateController,
  ConfigurationGetController,
  ConfigurationGetDbConnectionController,
  ConfigurationStartProxyController,
  ConfigurationAddApplicationHostController,
  ConfigurationStopProxyController
} from '../controllers/configuration'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'
import CheckDatabaseConnection from '../middleware/CheckDatabaseConnection'

const routes = Router()

routes.get('/configuration', ConfigurationGetController.getConfiguration)
routes.put('/configuration', Authenticate.authenticateAdmin, ConfigurationUpdateController.updateConfiguration)
routes.put('/configuration/application-host', Authenticate.authenticateAdmin, ConfigurationAddApplicationHostController.addApplicationHost)
routes.post('/configuration/mongo-host', ConfigurationCreateController.createConfiguration)
routes.get('/configuration/db-connection', CheckDatabaseConnection.checkDbConnection, ConfigurationGetDbConnectionController.getDbConnection)
routes.get('/configuration/start-proxy', Authenticate.authenticateAdmin, ConfigurationStartProxyController.startProxy)
routes.get('configuration/stop-proxy', Authenticate.authenticateAdmin, ConfigurationStopProxyController.stopProxy)

export default routes
