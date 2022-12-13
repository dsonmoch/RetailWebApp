const md5 = require("md5");

const decryptPassword = (userInputPasswd) => {
  var password = md5(userInputPasswd);
  return password + "\\r";
};

module.exports = decryptPassword;
