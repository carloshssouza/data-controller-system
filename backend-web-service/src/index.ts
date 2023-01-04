import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || process.env.APP_PORT

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
