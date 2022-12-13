const { verifyJWT } = require("./jwt");
const ErrorHandler = require("../error/errorHandler");

const authenticateCustomer = (req, res, next) => {
  if (!req.headers.authorization) {
    next(ErrorHandler.authTokenError("No authorization token found"));
  } else {
    const authToken = req.headers.authorization.split(" ")[1];
    if (verifyJWT(authToken)) {
      next();
    } else {
      next(ErrorHandler.authTokenError("Token not doesnot match"));
    }
  }
};

module.exports = authenticateCustomer;
