const express = require('express')
const app = express()

// app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  // console.log(request.headers)
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  // console.log(request.headers)
  // console.log(persons.length)
  // console.log(new Date())
  response.send(
    `<h3>Phonebook has info for ${persons.length} people</h3>
    <p>${new Date()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
  // console.log(request.headers)
  response.json(persons)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})