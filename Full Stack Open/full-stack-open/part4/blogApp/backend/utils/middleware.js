const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path, request.body);

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(400).json({ error: 'unknown endpoint' });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(404).json({
      error: 'user not found',
    });
  }

  request.user = user;

  next();
};

const errorHanlder = (error, request, response, next) => {
  response.status(400);

  if (error.name === 'CastError') {
    response.json({ error: 'malformated id' });
  } else if (error.name === 'ValidationError') {
    response.json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHanlder,
  tokenExtractor,
  userExtractor,
};
