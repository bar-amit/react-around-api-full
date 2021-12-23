const { notFoundError } = require("../utils/errors");

function handleNotFound(req, res, next) {
  next(new notFoundError("Requested resource not found"));
}

module.exports = handleNotFound;
