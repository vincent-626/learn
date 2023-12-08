const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const connection = require("../db/db");

const jwtSecret = process.env.JWT_SECRET;

router.post("/new", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.json(null);
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) throw err;

    const { user_id, skills, description, rate } = req.body;

    const query =
      "INSERT INTO Tutors (user_id, skills, description, rate) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [user_id, skills, description, rate],
      (err, result) => {
        if (err) throw err;

        const query2 = "UPDATE Users SET isTutor = ? WHERE id = ?";
        connection.query(query2, [1, user_id], (err2, result2) => {
          if (err2) throw err2;
          res.json({ tutorResult: result, userResult: result2 });
        });
      }
    );
  });
});

router.put("/edit", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.json(null);
    return;
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) throw err;

    const { user_id, skills, description, rate } = req.body;

    const query =
      "UPDATE Tutors SET skills = ?, description = ?, rate = ? WHERE user_id = ?";
    connection.query(
      query,
      [skills, description, rate, user_id],
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
  });
});

router.delete("/delete", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.json(null);
    return;
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) throw err;

    const query = "DELETE FROM Tutors WHERE user_id = ?";
    connection.query(query, [user.id], (err, result) => {
      if (err) throw err;

      const query2 = "UPDATE Users SET isTutor = ? WHERE id = ?";
      connection.query(query2, [0, user.id], (err2, result2) => {
        if (err2) throw err2;
        res.json({ tutorResult: result, userResult: result2 });
      });
    });
  });
});

module.exports = router;
