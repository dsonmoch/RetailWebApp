class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static sqlError(msg) {
    return new ErrorHandler(500, msg);
  }

  static serverError(msg) {
    return new ErrorHandler(500, msg);
  }

  static validationError(msg) {
    return new ErrorHandler(400, msg);
  }

  static authTokenError(msg) {
    return new ErrorHandler(401, msg);
  }
}

module.exports = ErrorHandler;
