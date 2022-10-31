import morgan from 'morgan';
import logger from './logger.js';

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});

const requestLogger = morgan((tokens, req, res) => {
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
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
