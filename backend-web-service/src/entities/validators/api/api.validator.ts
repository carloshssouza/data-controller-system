import { ApiCreateData, ApiUpdateData } from '../../../interfaces/api'
import { Joi } from '../../../types/joi'
import { TypeId } from '../../../types/mongoose'

export default class ApiSchemaValidator {
  /**
   * Method to validate the using joi - create validation
   * @param apiData Object containing the body of the request
   * @returns Returns the schema or error
   */
  createApiValidation (apiData: ApiCreateData) {
    const schema = Joi.object<ApiCreateData>({
      route: Joi.string().required(),
      dataReturnAllowed: Joi.boolean().required()
    })

    return schema.validate(apiData)
  }

  /**
   * Method to validate the using joi - update validation
   * @param apiData Object containing the body of the request
   * @returns Returns the schema or error
   */
  updateApiValidation (apiData: ApiUpdateData) {
    const schema = Joi.object<ApiUpdateData>({
      route: Joi.string().optional(),
      dataReturnAllowed: Joi.boolean().optional()
    }).or('route', 'dataReturnAllowed')

    return schema.validate(apiData)
  }

  /**
   * Method to validate the using joi - get validation
   * @param _id Id of the api to validate
   * @returns Returns the schema or error
   */
  getApiValidation (_id: TypeId) {
    const schema = Joi.object({
      _id: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      })
    })

    return schema.validate({ _id })
  }

  /**
   * Method to validate the using joi - delete validation
   * @param _id Id of the api to validate
   * @returns Returns the schema or error
   */
  deleteApiValidation (_id: TypeId) {
    const schema = Joi.object({
      _id: Joi.string().hex().length(24).required().messages({
        'string.base': 'Invalid type',
        'string.hex': 'Invalid type',
        'string.length': 'Invalid id length',
        'any.required': 'Id is required'
      })
    })

    return schema.validate({ _id })
  }

  /**
   * Method to validate the using joi - get permission validation
   * @param route Route name of the api to validate
   * @returns Returns the schema or error
   */
  getApiPermissionValidation (endpointPath: string, requestType: string) {
    const schema = Joi.object({
      endpointPath: Joi.string().required(),
      requestType: Joi.string().required().valid('GET', 'POST', 'PUT', 'DELETE', 'PATCH')
    })

    return schema.validate({ endpointPath, requestType })
  }
}
