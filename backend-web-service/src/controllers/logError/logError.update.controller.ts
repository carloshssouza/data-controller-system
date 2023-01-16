import ErrorRes from '../../utils/Erro'
import LogErrorEntity from '../../entities/logError/logError.entity'
import { Request, Response } from '../../types/express'
import { TypeId } from '../../types/mongoose'

class LogErrorUpdateController {
  public async updateLogError (req: Request, res: Response): Promise<Response> {
    try {
      const logError = await new LogErrorEntity().updateLogError(req.params._id as unknown as TypeId, req.body)

      if (!logError) {
        throw new ErrorRes(500, 'Error updating log error')
      }

      return res.status(200).json({ message: 'log error updated successfully' })
    } catch (error) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}

export default new LogErrorUpdateController()
