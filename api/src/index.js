require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

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

app.post("/api/users/register", (req, res) => {
  const { name, email, password, university } = req.body;
  const query =
    "INSERT INTO Users (name, email, password, university) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [name, email, bcrypt.hashSync(password, bcryptSalt), university],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM Users WHERE email = ?";
  connection.query(query, [email], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(401).json({ message: "User not found" });
    } else {
      const user = result[0];
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret);
        res.cookie("token", token).json(user);
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    }
  });
});

app.get("/api/users/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

app.get("/api/users/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.json(null);
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) throw err;
    const query = "SELECT * FROM Users WHERE id = ?";
    connection.query(query, [user.id], (err, result) => {
      if (err) throw err;
      const { id, name, email } = result[0];
      res.json({ id, name, email });
    });
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
