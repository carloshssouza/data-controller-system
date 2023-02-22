import ValidateTokenController from '../controllers/login/validate.token.controller'
import LoginController from '../controllers/login/login.controller'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.post('/login', LoginController.loginUser)
routes.get('/validate-token', Authenticate.authenticateCommon, ValidateTokenController.validateToken)

export default routes
