require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "learn",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL Database connected");
});

module.exports = connection;
