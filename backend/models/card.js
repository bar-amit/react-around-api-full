const mongoose = require("mongoose");
const user = require("./user");
const urlValidator = require("../utils/urlValidator");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: user,
    required: true,
  },
  likes: {
    type: mongoose.Types.Array(mongoose.Types.ObjectId),
    ref: user,
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("card", cardSchema);
