module.exports.errorHandler = (err, req, res, next) => {
  if (err.statusCode && err.statusCode !== 500) res.status(err.status).send(err.message);
  else res.status(500).send(new Error('Server error'));
};
