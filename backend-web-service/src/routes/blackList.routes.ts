import BlackListController from '../controllers/blackList/blackList.controller'
import { Router } from '../types/express'
import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.post('/logout', Authenticate.authenticateCommon, BlackListController.createRevokedToken)

export default routes
