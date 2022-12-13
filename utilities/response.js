const { generateJWT } = require("../authentication/jwt");
const compressResponse = require("./compressResponse");

const responseConstructor = (result, message, login) => {
  const token = generateJWT(result[0].customer_email);
  if (login === 1 && token) {
    const res = {
      sucess: "true",
      message: message,
      token: token,
      data: { result },
    };
    compressResponse(res);
    return res;
  } else {
    const res = {
      sucess: "true",
      message: message,
      data: { result },
    };
    compressResponse(res);
    return res;
  }
};

module.exports = responseConstructor;
