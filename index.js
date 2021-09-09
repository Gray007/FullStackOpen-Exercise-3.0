const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
app.use(express.json())

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

morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
});

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(
    `<h3>Phonebook has info for ${persons.length} people</h3>
    <p>${new Date()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(204).end()
  }
})

const generateId = () => {
  const maxId = 10000
  let randomId = Math.floor(Math.random() * maxId)
  return randomId
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const duplicateName = persons.some(person => person.name === body.name)
  
  if (!body.name || !body.number) {
    return response.status(406).json({
      error: 'content missing'
    })
  } else if (duplicateName) {
    return response.status(409).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})