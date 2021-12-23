module.exports.errorHandler = (err, req, res, next) => {
  if (err.status) res.status(err.status).send(err.message);
  else if (err.message) res.status(500).send(err.message);
  else res.status(500).send(new Error("Server error"));
};
