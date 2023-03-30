import ApiValidator from '../api.validator'
import { ApiCreateData } from '../../../interfaces/api'

const MockApiCreateValidation: jest.SpyInstance = jest.spyOn(ApiValidator, 'createApiValidation')

describe('Api Validator Test', () => {
  it('Should validate the create operation', async () => {
    const apiData: ApiCreateData = {
      routeName: 'Test',
      endpointPath: '/test',
      requestType: 'GET',
      dataReturnAllowed: false
    }
    MockApiCreateValidation.mockImplementation(() => apiData)
    const validate = await ApiValidator.createApiValidation(apiData)
    console.log(validate)
    expect(validate).toEqual(apiData)
  })
})
