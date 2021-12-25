const { NotFoundError } = require('../utils/errors');

function handleNotFound(req, res, next) {
  next(new NotFoundError('Requested resource not found'));
}

module.exports = handleNotFound;
