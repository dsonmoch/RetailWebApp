require("dotenv").config();
const jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATE_KEY;

var token;

const generateJWT = (email) => {
  token = jwt.sign({ email: email }, privateKey, { expiresIn: 20000 });
  return token;
};

const verifyJWT = (customerToken) => {
  const userToken = jwt.verify(customerToken, privateKey, (error, result) => {
    if (error) {
      return false;
    } else {
      return true;
    }
  });

  if (userToken) {
    return true;
  } else {
    return false;
  }
};

module.exports = { generateJWT, verifyJWT };
