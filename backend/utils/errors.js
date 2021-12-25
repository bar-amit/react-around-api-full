const BadRequestError = require("./error/BadRequestError");
const UnauthorizedErorr = require("./error/UnauthorizedError");
const ForbiddenError = require("./error/ForbiddenError");
const NotFoundError = require("./error/NotFoundError");
const ServerError = require("./error/ServerError");

module.exports = {
  UnauthorizedErorr,
  ForbiddenError,
  BadRequestError,
  NotFoundError,
  ServerError,
};
