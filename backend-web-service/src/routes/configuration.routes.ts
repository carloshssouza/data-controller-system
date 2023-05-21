import {
  ConfigurationUpdateController,
  ConfigurationGetController,
  ConfigurationAddRestrictDataController,
  ConfigurationUpdateRestrictDataController,
  ConfigurationGetRestrictDataController,
  ConfigurationDeleteRestrictDataController
} from '../controllers/configuration'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.get('/configuration', ConfigurationGetController.getConfiguration)
routes.put('/configuration', Authenticate.authenticateCommon, ConfigurationUpdateController.updateConfiguration)
routes.get('/configuration/restrict-data', Authenticate.authenticateCommon, ConfigurationGetRestrictDataController.getRestrictData)
routes.post('/configuration/restrict-data', Authenticate.authenticateCommon, ConfigurationAddRestrictDataController.addRestrictData)
routes.patch('/configuration/restrict-data', Authenticate.authenticateCommon, ConfigurationUpdateRestrictDataController.updateRestrictData)
routes.delete('/configuration/restrict-data', Authenticate.authenticateCommon, ConfigurationDeleteRestrictDataController.deleteRestrictData)

export default routes
