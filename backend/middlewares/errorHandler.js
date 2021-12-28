module.exports.errorHandler = (err, req, res, next) => {
  if (err.statusCode && err.statusCode !== 500) {
    res.status(err.statusCode).send({ message: err.message });
  } else res.status(500).send(new Error('An error has occurred on the server.'));
};
