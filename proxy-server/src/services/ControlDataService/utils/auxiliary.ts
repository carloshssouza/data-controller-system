import { IFindPrivateData } from '../../../services/IdentifierService'
import { IncomingMessage } from '../../../types/http'

export default abstract class Auxiliary {
  public async createLogErroData (privateDataFound: IFindPrivateData[], apiResponse: any, req: IncomingMessage) {
    return {
      title: 'Leaking data',
      description: await this.getDescriptionLogError(privateDataFound),
      routeId: apiResponse._id,
      endpointPath: req.url,
      routeName: apiResponse.routeName,
      leakData: privateDataFound,
      level: await this.getLogErrorLevel(privateDataFound.length)
    }
  }

  private async getDescriptionLogError (privateDataFound: IFindPrivateData[]) {
    const dataTypes = privateDataFound.map((element: IFindPrivateData) => element.type)
    let description = 'Your API is leaking '
    if (dataTypes.includes('personal') && !dataTypes.includes('sensible')) {
      description += 'personal data'
    } else if (dataTypes.includes('personal') && dataTypes.includes('sensible')) {
      description += 'personal and sensible data'
    } else if (!dataTypes.includes('personal') && dataTypes.includes('sensible')) {
      description += 'sensible data'
    }

    return description
  }

  private async getLogErrorLevel (privateDataFoundLength: number) {
    if (privateDataFoundLength >= 1 || privateDataFoundLength <= 2) {
      return 'low'
    } else if (privateDataFoundLength >= 3 || privateDataFoundLength <= 4) {
      return 'medium'
    } else if (privateDataFoundLength >= 5) {
      return 'high'
    }
  }
}
