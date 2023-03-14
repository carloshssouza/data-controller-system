import {
  ConfigurationCreateController,
  ConfigurationUpdateController,
  ConfigurationGetController,
  ConfigurationGetDbConnectionController,
  ConfigurationStartProxyController,
  ConfigurationAddApplicationHostController,
  ConfigurationStopProxyController,
  ConfigurationCheckProxyController,
  ConfigurationCheckApplicationHostController
} from '../controllers/configuration'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'
import CheckDatabaseConnection from '../middleware/CheckDatabaseConnection'

const routes = Router()

routes.get('/configuration', CheckDatabaseConnection.checkDbConnection, ConfigurationGetController.getConfiguration)
routes.put('/configuration', Authenticate.authenticateAdmin, ConfigurationUpdateController.updateConfiguration)
routes.put('/configuration/application-host', CheckDatabaseConnection.checkDbConnection, ConfigurationAddApplicationHostController.addApplicationHost)
routes.post('/configuration/mongo-host', ConfigurationCreateController.createConfiguration)
routes.get('/configuration/db-connection', CheckDatabaseConnection.checkDbConnection, ConfigurationGetDbConnectionController.getDbConnection)
routes.get('/configuration/start-proxy', Authenticate.authenticateAdmin, ConfigurationStartProxyController.startProxy)
routes.get('/configuration/stop-proxy', Authenticate.authenticateAdmin, ConfigurationStopProxyController.stopProxy)
routes.get('/configuration/check-proxy', Authenticate.authenticateAdmin, ConfigurationCheckProxyController.checkProxy)
routes.get('/configuration/check-application-host', Authenticate.authenticateAdmin, ConfigurationCheckApplicationHostController.checkApplicationHost)

export default routes
