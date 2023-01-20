import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

const packageDef = protoLoader.loadSync('./controlSystem.proto', {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const controlSystemPackage = grpcObject.controlSystemPackage as any

const client = new controlSystemPackage.ControlSystemService('localhost:9000', grpc.credentials.createInsecure())

client.getApiPermission({
  endpointPath: '',
  requestType: ''
}, (err, response) => {
  console.log('Receive from server' + JSON.stringify(response))
})
