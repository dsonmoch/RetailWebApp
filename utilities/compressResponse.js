const zlib = require("zlib");

const compressResponse = async (response) => {
  return new Promise((resolve, reject) => {
    var response = JSON.stringify(response);
    var compressed = zlib.gzip(response, (error, result) => {
      if (error) {
        return reject(error.message);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = compressResponse;
