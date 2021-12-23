module.exports = {
  unauthorizedErorr,
  forbiddenError,
  badRequestError,
  notFoundError,
  serverError,
};

class badRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class unauthorizedErorr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class forbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class notFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class serverError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}
