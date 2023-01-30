import { ILeakedData } from '../../repositories/interfaces/interfaces.schemas'
import { TypeId } from '../../types/mongoose'

interface ErrorLogCreateData {
  title: string
  description: string
  routeId: TypeId
  leakedData: ILeakedData[]
  level: string
}

interface ErrorLogUpdateData {
  title?: string
  description?: string
  routeId?: TypeId
  leakedData?: ILeakedData[]
  level?: string
}

interface IFilterLeakedData {
  personal?: string
  sensible?: string
}

export {
  ErrorLogCreateData,
  ErrorLogUpdateData,
  IFilterLeakedData
}
