import { ILeakedData } from '../../repositories/interfaces/interfaces.schemas'
import { TypeId } from '../../types/mongoose'

interface ErrorLogCreateData {
  title: string
  description: string
  routeId: TypeId
  routeName: string
  leakData: ILeakedData[]
}

interface ErrorLogUpdateData {
  title?: string
  description?: string
  routeId?: TypeId
  routeName?: string
  leakData?: ILeakedData[]
}

export {
  ErrorLogCreateData,
  ErrorLogUpdateData
}
