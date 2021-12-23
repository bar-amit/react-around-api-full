module.exports.errorHandler = (err, req, res, next) => {
  if (err.status) res.status(err.status).send(err.message);
  if (err.message) res.status(500).send(err.message);
  res.status(500).send(new Error("Server error"));
};
