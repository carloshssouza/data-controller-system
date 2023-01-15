import app from './app'
import grpc from './grpc'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || process.env.APP_PORT

grpc.start()
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
