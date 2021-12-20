function handleNotFound(req, res, next) {
  res.status(404).send({ message: 'Requested resource not found' });
  next();
}

module.exports = handleNotFound;
