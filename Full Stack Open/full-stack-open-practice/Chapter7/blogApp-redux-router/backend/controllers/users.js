const usersRouter = require('express').Router();
const User = require('./models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(400).send({ error: 'both username and password must be given' });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({ error: 'both username and password must be at least 3 characters long' });
  }

  if (await User.findOne({ username })) {
    return response.status(400).send({ error: 'username must be unique' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
