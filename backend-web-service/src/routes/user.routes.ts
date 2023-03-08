import { UserCreateController, UserMeController, UserUpdateController } from '../controllers/user'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.post('/user', UserCreateController.createUser)
routes.get('/user/me', Authenticate.authenticateCommon, UserMeController.getUser)
routes.put('/user', Authenticate.authenticateCommon, UserUpdateController.updateUser)

export default routes
