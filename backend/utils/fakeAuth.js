function auth(req, res, next) {
  req.user = {
    _id: '61a773e5ba434ee1051fb5af',
  };

  next();
}

module.exports = auth;
