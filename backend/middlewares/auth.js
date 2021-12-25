const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'not-a-secret-just-a-string' } = process.env;
const { ForbiddenError, UnauthorizedErorr } = require('../utils/errors');

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ForbiddenError('Access is forbidden'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedErorr('Authorization is required'));
  }

  req.user = payload;

  next();
}

module.exports = { auth };
