import { ILeakedData } from '../../repositories/interfaces/interfaces.schemas'
import { TypeId } from '../../types/mongoose'

interface ErrorLogCreateData {
  title: string
  description: string
  routeId: TypeId
  leakedData: ILeakedData[]
  level: number
}

interface ErrorLogUpdateData {
  title?: string
  description?: string
  routeId?: TypeId
  leakedData?: ILeakedData[]
  level?: number
}

export {
  ErrorLogCreateData,
  ErrorLogUpdateData
}
