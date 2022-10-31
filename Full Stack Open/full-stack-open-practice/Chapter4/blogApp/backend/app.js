import express from 'express';
import config from './utils/config.js';
import logger from './utils/logger.js';
import middleware from './utils/middleware.js';
import blogsRouter from './controllers/blogs.js';
import cors from 'cors';
import mongoose from 'mongoose';

console.log('Connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
