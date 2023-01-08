import { ILeakData } from '../../repositories/interfaces/interfaces.schemas'
import { TypeId } from '../../types/mongoose'

interface LogErrorCreateData {
  title: string
  description: string
  routeId: TypeId
  routeName: string
  leakData: ILeakData[]
}

interface LogErrorUpdateData {
  title?: string
  description?: string
  routeId?: TypeId
  routeName?: string
  leakData?: ILeakData[]
}

export {
  LogErrorCreateData,
  LogErrorUpdateData
}
