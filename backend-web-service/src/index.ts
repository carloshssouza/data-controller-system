import express from 'express'
import cors from 'cors'

const app = express()
const port = 9000

app.use(cors())
app.use(express.json())

app.get('/api/user', (req, res) => {
  res.send('teste')
})

app.listen(port, () => console.log('listening on port ' + port))
