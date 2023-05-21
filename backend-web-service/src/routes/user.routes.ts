import { UserCreateController, UserDeleteController, UserGetAllController, UserMeController, UserUpdateController } from '../controllers/user'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.post('/user', UserCreateController.createUser)
routes.get('/user/me', Authenticate.authenticateCommon, UserMeController.getUser)
routes.put('/user/:_id', Authenticate.authenticateAdmin, UserUpdateController.updateUser)
routes.get('/user', Authenticate.authenticateCommon, UserGetAllController.getAllUsers)
routes.delete('/user/:_id', Authenticate.authenticateAdmin, UserDeleteController.deleteUser)

export default routes
