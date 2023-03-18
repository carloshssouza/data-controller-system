const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.post('/user', (req, res) => { 
  const { name, email, password } = req.body
  const user = {
    id: 1,
    name,
    email,
    password
  }
  return res.json(user).status(200)
})

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



app.get('/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100
    },
    {
      id: 2,
      name: "Product 2",
      price: 200
    },
    {
      id: 3,
      name: "Product 3",
      price: 300
    }
  ]
  return res.json(products).status(200)
})



app.listen(PORT, () => console.log(`Listening on ${PORT}`))
