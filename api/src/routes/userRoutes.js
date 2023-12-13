const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { connection } = require("../db/db");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

router.use(cookieParser());

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
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

router.get("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

router.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.json(null);
    return;
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) throw err;
    const query = "SELECT * FROM Users WHERE id = ?";
    connection.query(query, [user.id], (err, result) => {
      if (err) throw err;
      const { id, name, email, isTutor, isLearner, photo } = result[0];
      res.json({ id, name, email, isTutor, isLearner, photo });
    });
  });
});

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/image", upload.single("user-image"), (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.json(null);
    return;
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) throw err;

    const deleteQuery = "SELECT photo FROM Users WHERE id = ?";
    connection.query(deleteQuery, [user.id], (err, result) => {
      if (err) throw err;
      if (result[0].photo) {
        if (result[0].photo !== "default.png") {
          fs.unlinkSync("./public/uploads/" + result[0].photo);
        }
      }
    });

    const query = "UPDATE Users SET photo = ? WHERE id = ?";
    connection.query(query, [req.file.filename, user.id], (err, result) => {
      if (err) throw err;
      res.json({ photo: req.file.filename });
    });
  });
});

router.get("/getTutor", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.json(null);
    return;
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) throw err;

    const query = "SELECT * FROM Tutors WHERE user_id = ?";
    connection.query(query, [user.id], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
});

router.get("/getLearner", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.json(null);
    return;
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) throw err;

    const query = "SELECT * FROM Learners WHERE user_id = ?";
    connection.query(query, [user.id], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
});

module.exports = router;
