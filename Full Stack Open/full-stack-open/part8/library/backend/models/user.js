const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
});

module.exports =  mongoose.model('User', userSchema);
