const HttpException = require("./HttpException");

class BadRequestError extends HttpException {
  constructor(message) {
    super(message);
  }
}

class NotFoundError extends HttpException {
  constructor(message) {
    super(message, 404);
  }
}

class ForbiddenError extends HttpException {
  constructor(message) {
    super(message, 403);
  }
}

class UnauthorizedError extends HttpException {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
};
