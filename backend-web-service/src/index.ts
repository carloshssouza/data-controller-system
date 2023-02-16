import app from './app'
import grpc from './grpc'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket: any) => {
  io.emit('message', 'Connected to server')
  console.log(`Socket connected: ${socket.id}`)
})

const PORT = process.env.EXPRESS_PORT || 9000

grpc.start()
server.listen(PORT, () => console.log(`App listening on port ${PORT}`))
