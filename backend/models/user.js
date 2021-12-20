const mongoose = require('mongoose');
const urlValidator = require('../utils/urlValidator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: urlValidator,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);