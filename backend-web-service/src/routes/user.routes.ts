import { UserCreateController, UserGetController, UserUpdateController } from '../controllers/user'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.post('/user', UserCreateController.createUser)
routes.get('/user/me/:id', Authenticate.authenticateCommon, UserGetController.getUser)
routes.put('/user', Authenticate.authenticateCommon, UserUpdateController.updateUser)

export default routes
