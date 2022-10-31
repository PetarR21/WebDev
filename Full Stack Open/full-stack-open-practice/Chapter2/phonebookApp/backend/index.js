const { request, response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
require('dotenv').config();
const Person = require('./models/person');

const morgan = require('morgan');
const person = require('./models/person');

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens['body'](req, res),
    ].join(' ');
  })
);

app.get('/info', async (request, response) => {
  const persons = await Person.find({});

  response.send(
    `<div>Phonebook has info for ${persons.length} ${
      persons.length === 1 ? 'person' : 'people'
    }</div><div>${new Date()}</div>`
  );
});

app.get('/api/persons', async (request, response) => {
  const persons = await Person.find({});
  response.json(persons);
});

app.get('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const person = await Person.findById(id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.post('/api/persons', async (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number,
  });

  try {
    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const person = await Person.findById(id);
    if (person) {
      await person.remove();
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.put('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  const updatedObject = request.body;

  try {
    const person = await Person.findById(id);
    if (person) {
      const updatedPerson = await Person.findByIdAndUpdate(id, updatedObject, {
        new: true,
        runValidators: true,
        context: 'query',
      });
      response.json(updatedPerson);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

const unknowEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};
app.use(unknowEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
