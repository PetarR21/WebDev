const { request, response } = require('express');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const morgan = require('morgan');

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

persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

app.get('/info', (request, response) => {
  response.send(
    `<div>Phonebook has info for ${persons.length} ${
      persons.length === 1 ? 'person' : 'people'
    }</div><div>${new Date()}</div>`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name) {
    return response.status(400).json({ error: 'name missing' });
  }
  if (!number) {
    return response.status(400).json({ error: 'number missing' });
  }
  if (persons.map((person) => person.name).includes(name)) {
    return response.status(400).json({ error: 'name must be unique' });
  }

  const newPerson = {
    id: generateId(),
    name,
    number,
  };

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const unknowEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};
app.use(unknowEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
