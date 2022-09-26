const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  if (!title && !url) {
    response.status(400).json({ error: 'title or url missing' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  const blogToReturn = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(blogToReturn);
});

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const id = request.params.id;
  const { comment } = request.body;
  const blog = await Blog.findById(id);

  if (!blog) {
    response.status(404).end();
  }

  blog.comments = blog.comments.concat(comment);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id;
  const blogToDelete = await Blog.findById(id);

  if (!blogToDelete) {
    return response.status(404).end();
  }

  const user = request.user;

  if (user.id.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({
      error: 'can not delete blog that was added by another user',
    });
  }

  await blogToDelete.remove();
  response.status(204).end();
});

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id;
  const blogToUpdate = await Blog.findById(id);

  if (!blogToUpdate) {
    response.status(404).end();
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  const blogToReturn = await Blog.findById(updatedBlog._id).populate('user', {
    username: 1,
    name: 1,
  });

  response.json(blogToReturn);
});

module.exports = blogsRouter;
