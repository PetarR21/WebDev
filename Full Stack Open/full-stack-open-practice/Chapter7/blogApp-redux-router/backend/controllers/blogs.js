const blogsRouter = require('express').Router();
const Blog = require('./models/blog');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const middleware = require('../utils/middleware');
const { request, response } = require('express');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id;

  const blog = await Blog.findById(id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  await savedBlog.populate('user', { username: 1, name: 1 });
  user.blogs = user.blogs.concat(savedBlog);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body;
  const id = request.params.id;

  const blog = await Blog.findById(id);

  blog.comments = blog.comments.concat(comment);
  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(id);
  const user = await User.findById(decodedToken.id);

  if (blog) {
    if (blog.user.toString() === user._id.toString()) {
      await blog.remove();
      return response.status(204).end();
    } else {
      return response.status(401).json({ error: 'unauthorized delete operation' });
    }
  } else {
    response.status(404).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const object = request.body;
  console.log(id);
  const updatedBlog = await Blog.findByIdAndUpdate(id, object, { new: true }).populate('user', {
    username: 1,
    name: 1,
  });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
