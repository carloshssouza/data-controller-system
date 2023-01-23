import app from './app'
import grpc from './grpc'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer(app)
export const io = new Server(server)

dotenv.config()

const PORT = process.env.EXPRESS_PORT || 9000

grpc.start()
server.listen(PORT, () => console.log(`App listening on port ${PORT}`))
