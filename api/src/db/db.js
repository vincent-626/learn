require("dotenv").config();
const mysql = require("mysql");
const redis = require("redis");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "learn",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL database connected");
});

const redisClient = redis.createClient();
(async () => {
  await redisClient.connect();
})();

redisClient.on("ready", () => {
  console.log("Redis database connected");
});

redisClient.on("error", (err) => {
  console.error(err);
});

module.exports = { connection, redisClient };
