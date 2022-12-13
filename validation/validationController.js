const ErrorHandler = require("../error/errorHandler");
const {
  loginSchema,
  userDetailsInputSchema,
  productDetailsInputSchema,
} = require("./validationSchema");

const loginValidation = (req, res, next) => {
  const loginDetails = req.query;
  const result = loginSchema.validate(loginDetails);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

const getUserDetailsValidation = (req, res, next) => {
  const userInput = req.query;
  const result = userDetailsInputSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

const getProductDetailsValidation = (req, res, next) => {
  const userInput = req.quer;
  const result = productDetailsInputSchema.validate(userInput);
  if (result.error) {
    next(ErrorHandler.validationError(result.error.message));
  } else {
    next();
  }
};

module.exports = {
  loginValidation,
  getUserDetailsValidation,
  getProductDetailsValidation,
};
