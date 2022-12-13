const jwt = require("jsonwebtoken");
const { executeQuery } = require("../utilities/db-config/connection");
const decryptPassword = require("../utilities/decryptPassword");
const {
  loginQuery,
  getUserDetailsQuery,
  constructProductDetailsQuery,
} = require("../utilities/db-config/constructQuery");
const ErrorHandler = require("../error/errorHandler");
const responseConstructor = require("../utilities/response");

const login = async (req, res, next) => {
  const userInput = req.query;
  const password = decryptPassword(userInput.password);
  const sqlQuery = loginQuery(userInput.email, password);

  const queryResult = await executeQuery(sqlQuery);
  if (queryResult.length === 0) {
    next(ErrorHandler.sqlError("Email not found or Password is wrong"));
  }
  res
    .status(200)
    .send(
      responseConstructor(queryResult, "Email verified & token generated", 1)
    );
};

const getUserDetails = async (req, res, next) => {
  const userInput = req.query;
  const authToken = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(authToken, process.env.PRIVATE_KEY);
  const email = decodedToken.email;

  const sqlQuery = getUserDetailsQuery(userInput, email);
  const queryResult = await executeQuery(sqlQuery);
  if (queryResult === 0) {
    next(ErrorHandler.sqlError("Check you Sql Query"));
  }
  res.status(200).send(responseConstructor(queryResult, "Rows Retrived!", 0));
};

const getProductDetails = async (req, res, next) => {
  const userInput = req.query;
  const sqlQuery = constructProductDetailsQuery(userInput);

  const queryResult = await executeQuery(sqlQuery);
  if (queryResult === 0) {
    next(ErrorHandler.sqlError("Check your Sql Query"));
  }
  res.status(200).send(responseConstructor(queryResult, "Rows Retrived!", 0));
};

module.exports = { login, getUserDetails, getProductDetails };
