const ErrorHandler = require("./errorHandler");
const midwareErrorHandler = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    res.status(err.status).send({
      sucess: false,
      message: err.message,
      data: {},
    });
    return;
  }
  res.status(500).send({
    sucess: false,
    message: "Something Went Wrong",
    data: {},
  });
};

module.exports = midwareErrorHandler;
