const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.get('/users', (req, res) => {
  const users = [
    {
      id: 1,
      name: "Carl",
      email: "carl@email.com",
      password: "1234"
    },
    {
      id: 2,
      name: "Henry",
      email: "henry@email.com",
      password: "1234"
    },
    {
      id: 3,
      name: "John",
      email: "john@email.com",
      password: "1234"
    }
  ]
  return res.json(users).status(200)
})


app.get('/user/:id', (req, res) => {
  console.log(req)
  const user = {
    id: 1,
    name: "Carl",
    email: "carl@email.com"
  }

  res.json(user).status(200)
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
