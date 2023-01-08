import LoginController from '../controllers/login/login.controller'
import { Router } from '../types/express'

const routes = Router()

routes.post('/login', LoginController.loginUser)

export default routes
