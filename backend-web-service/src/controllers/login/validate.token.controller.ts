import { Request, Response } from '../../types/express'

class ValidateTokenController {
  async validateToken (req: Request, res: Response): Promise<Response> {
    try {
      res.status(200).json({ message: 'Valid token' })
    } catch (error: any) {
      console.error(error)
      return res.status(error.status || 500).json({ message: error.message })
    }
  }
}
export default new ValidateTokenController()
