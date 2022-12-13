require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const executeQuery = (sqlQuery) => {
  return new Promise(async (resolve, reject) => {
    if (sqlQuery) {
      connection.query(sqlQuery, (error, result, fields) => {
        if (error) {
          throw error;
        } else {
          return resolve(result);
        }
      });
    } else {
      connection.end();
    }
  });
};

module.exports = { connection, executeQuery };
