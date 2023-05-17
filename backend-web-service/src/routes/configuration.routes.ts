import {
  ConfigurationCreateController,
  ConfigurationUpdateController,
  ConfigurationGetController,
  ConfigurationGetDbConnectionController,
  ConfigurationStartProxyController,
  ConfigurationAddApplicationHostController,
  ConfigurationStopProxyController,
  ConfigurationCheckProxyController,
  ConfigurationCheckApplicationHostController,
  ConfigurationDeleteApplicationHostController,
  ConfigurationDeleteMongoHostController,
  ConfigurationAddRestrictDataController,
  ConfigurationDeleteRestrictDataController,
  ConfigurationUpdateRestrictDataController,
  ConfigurationGetRestrictDataController
} from '../controllers/configuration'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'
import CheckDatabaseConnection from '../middleware/CheckDatabaseConnection'

const routes = Router()

routes.get('/configuration', CheckDatabaseConnection.checkDbConnection, ConfigurationGetController.getConfiguration)
routes.put('/configuration', Authenticate.authenticateCommon, ConfigurationUpdateController.updateConfiguration)
routes.put('/configuration/application-host', CheckDatabaseConnection.checkDbConnection, ConfigurationAddApplicationHostController.addApplicationHost)
routes.get('/configuration/restrict-data', Authenticate.authenticateCommon, CheckDatabaseConnection.checkDbConnection, ConfigurationGetRestrictDataController.getRestrictData)
routes.post('/configuration/restrict-data', Authenticate.authenticateCommon, CheckDatabaseConnection.checkDbConnection, ConfigurationAddRestrictDataController.addRestrictData)
routes.patch('/configuration/restrict-data', Authenticate.authenticateCommon, CheckDatabaseConnection.checkDbConnection, ConfigurationUpdateRestrictDataController.updateRestrictData)
routes.post('/configuration/mongo-host', ConfigurationCreateController.createConfiguration)
routes.get('/configuration/db-connection', CheckDatabaseConnection.checkDbConnection, ConfigurationGetDbConnectionController.getDbConnection)
routes.get('/configuration/start-proxy', Authenticate.authenticateCommon, ConfigurationStartProxyController.startProxy)
routes.get('/configuration/stop-proxy', Authenticate.authenticateCommon, ConfigurationStopProxyController.stopProxy)
routes.get('/configuration/check-proxy', Authenticate.authenticateCommon, ConfigurationCheckProxyController.checkProxy)
routes.get('/configuration/check-application-host', Authenticate.authenticateCommon, ConfigurationCheckApplicationHostController.checkApplicationHost)
routes.delete('/configuration/application-host', Authenticate.authenticateCommon, ConfigurationDeleteApplicationHostController.deleteApplicationHost)
routes.delete('/configuration/mongo-host', Authenticate.authenticateCommon, ConfigurationDeleteMongoHostController.deleteMongoHost)
routes.delete('/configuration/restrict-data', Authenticate.authenticateCommon, ConfigurationDeleteRestrictDataController.deleteRestrictData)

export default routes
