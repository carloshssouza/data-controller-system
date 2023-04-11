import { ApiGetController, ApiGetAllController, ApiUpdateController, ApiDeleteController, ApiCreateController, ApiGetPermission } from '../controllers/api'
import { Router } from '../types/express'
// import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.post('/api-info', ApiCreateController.createApi)
routes.post('/api-info/permission', ApiGetPermission.getApiPermission)
routes.get('/api-info/:_id', ApiGetController.getApi)
routes.get('/api-info', ApiGetAllController.getAllApis)
routes.put('/api-info/:_id', ApiUpdateController.updateApi)
routes.delete('/api-info/:_id', ApiDeleteController.deleteApi)

export default routes
