import { UserCreateController, UserDeleteController, UserGetAllController, UserGetController, UserUpdateController } from '../controller/user'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.post('/user', UserCreateController.createUser)
routes.get('/user/:id', Authenticate.authenticateAdmin, UserGetController.getUser)
routes.get('/user', Authenticate.authenticateAdmin, UserGetAllController.getAllUsers)
routes.get('/user/me/:id', Authenticate.authenticateCommon, UserGetController.getUser)
routes.put('/user', Authenticate.authenticateCommon, UserUpdateController.updateUser)
routes.delete('/user', Authenticate.authenticateAdmin, UserDeleteController.deleteUser)

export default routes
