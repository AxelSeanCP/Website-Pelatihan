const HttpException = require("../exceptions/HttpException");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = errorMiddleware;
