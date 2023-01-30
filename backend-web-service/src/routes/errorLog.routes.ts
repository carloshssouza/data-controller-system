import {
  ErrorLogGetController,
  ErrorLogGetAllController,
  ErrorLogUpdateController,
  ErrorLogDeleteController,
  ErrorLogLeakedDataController,
  ErrorLogLeakedDataByApiController
} from '../controllers/errorLog'
import { Router } from '../types/express'
// import Authenticate from '../middleware/Authenticate'

const routes = Router()

routes.get('/error-log/:_id', ErrorLogGetController.getErrorLog)
routes.get('/error-log', ErrorLogGetAllController.getAllErrorLogs)
routes.put('/error-log/:_id', ErrorLogUpdateController.updateErrorLog)
routes.delete('/error-log/:_id', ErrorLogDeleteController.deleteErrorLog)
routes.get('/error-log/filter/leaked-data', ErrorLogLeakedDataController.getErrorLogLeakedData)

routes.get('/error-log/filter/leaked-data-by-api', ErrorLogLeakedDataByApiController.getErrorLogLeakedDataByApi)

// Quantidade de dados vazados por todas api

// // Quantidade de dados vazados por api, req param com id da api e req.query para pessoal ou sensivel
// routes.get('/error-log/amount-leaked-data-by-api/:_id', ErrorLogAmountLeakedDataByApiController.getErrorLogAmountLeakedDataByApi)

// // Quantidade de vazamento pelo level, considerar de todos, dos sensivels e pessoais, req.query
// routes.get('/error-log/amount-leaked-data-level', ErrorLogAmountLeakedDataLevel.getErrorLogAmountLeakedDataLevel)

// // Busca inteligente que considera todos os filtros possíveis
// routes.post('error-log/filter-search', ErrorLogFilterSearchController.getErrorLogDataByFilter)

export default routes
