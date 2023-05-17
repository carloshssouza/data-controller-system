import Authenticate from '../middleware/Authenticate'
import {
  ErrorLogGetController,
  ErrorLogGetAllController,
  ErrorLogUpdateController,
  ErrorLogDeleteController,
  ErrorLogLeakedDataController,
  ErrorLogDynamicFilterController,
  ErrorLogLeakedDataByApiController,
  ErrorLogGetExtraInfosController
} from '../controllers/errorLog'
import { Router } from '../types/express'

const routes = Router()

routes.get('/error-log-extra-infos', Authenticate.authenticateCommon, ErrorLogGetExtraInfosController.getExtraInfosErrorLogs)
routes.get('/error-log/:_id', Authenticate.authenticateCommon, ErrorLogGetController.getErrorLog)
routes.get('/error-log', Authenticate.authenticateCommon, ErrorLogGetAllController.getAllErrorLogs)
routes.put('/error-log/:_id', Authenticate.authenticateCommon, ErrorLogUpdateController.updateErrorLog)
routes.delete('/error-log/:_id', Authenticate.authenticateCommon, ErrorLogDeleteController.deleteErrorLog)
routes.get('/error-log/filter/leaked-data', Authenticate.authenticateCommon, Authenticate.authenticateCommon, ErrorLogLeakedDataController.getErrorLogLeakedData)
routes.get('/error-log/filter/leaked-data-by-api', Authenticate.authenticateCommon, ErrorLogLeakedDataByApiController.getErrorLogLeakedDataByApi)
routes.post('/error-log/dynamic-filter', Authenticate.authenticateCommon, ErrorLogDynamicFilterController.getErrorLogDynamicFilter)

export default routes
