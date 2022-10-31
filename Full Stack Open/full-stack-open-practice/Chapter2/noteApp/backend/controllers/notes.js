const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get('/:id', async (request, response, next) => {
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

notesRouter.post('/', async (request, response, next) => {
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

notesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;

  try {
    await Note.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

notesRouter.put('/:id', async (request, response, next) => {
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

module.exports = notesRouter;
