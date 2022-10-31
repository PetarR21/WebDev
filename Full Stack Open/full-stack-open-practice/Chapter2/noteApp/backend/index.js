const { request, response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Note = require('./models/note');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

app.get('/', (request, response) => {
  response.send('<h1>Note App</h1>');
});

app.get('/api/notes', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

app.get('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id;

  try {
    const note = await Note.findById(id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.post('/api/notes/', async (request, response, next) => {
  const { content, important } = request.body;

  const note = new Note({
    content,
    important: important || false,
    date: new Date(),
  });

  try {
    const savedNote = await note.save();
    response.json(savedNote);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id;

  try {
    await Note.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.put('/api/notes/:id', async (request, response, next) => {
  const { content, important } = request.body;

  const note = {
    content,
    important,
  };
  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
