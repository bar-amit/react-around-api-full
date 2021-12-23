const mongoose = require("mongoose");
const validator = require("validator");

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
    required: true,
  },
  email: {
    type: String,
    minlength: 7,
    maxlength: 50,
    required: true,
    unique: true,
    validate: { validator: validator.isEmail },
  },
  password: {
    type: String,
    requires: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
