const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')


app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
app.use(express.static('build'))
app.use(express.json())

// app.get('/', (request, response) => {
//   response.send('<h1>Hello Helsinki!</h1>')
// })

morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  
  if (!body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
    date: new Date(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(person => {
      if (person) {
        response.status(204).end()
      } else {
        response.status(400).end()
      }
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})