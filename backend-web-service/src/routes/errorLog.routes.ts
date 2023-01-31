import {
  ErrorLogGetController,
  ErrorLogGetAllController,
  ErrorLogUpdateController,
  ErrorLogDeleteController,
  ErrorLogLeakedDataController,
  ErrorLogDynamicFilterController
} from '../controllers/errorLog'
import { Router } from '../types/express'
// import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.get('/error-log/:_id', ErrorLogGetController.getErrorLog)
routes.get('/error-log', ErrorLogGetAllController.getAllErrorLogs)
routes.put('/error-log/:_id', ErrorLogUpdateController.updateErrorLog)
routes.delete('/error-log/:_id', ErrorLogDeleteController.deleteErrorLog)
routes.get('/error-log/filter/leaked-data', ErrorLogLeakedDataController.getErrorLogLeakedData)
routes.post('/error-log/dynamic-filter', ErrorLogDynamicFilterController.getErrorLogDynamicFilter)

export default routes
