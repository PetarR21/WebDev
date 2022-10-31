import express, { request, response } from 'express';
import Blog from '../models/blog.js';
const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  try {
    const savedBlog = await blog.save();
    response.json(savedBlog);
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
