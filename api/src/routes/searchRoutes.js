const express = require("express");
const router = express.Router();
const connection = require("../db/db");

router.get("/learners", (req, res) => {
  let search = req.query.search;
  search = "%" + search + "%";

  const query =
    "SELECT U.id, U.name, U.email, U.university, U.photo, L.skills, L.description, L.rate FROM Learners L INNER JOIN Users U ON L.user_id = U.id WHERE L.skills LIKE ?";

  connection.query(query, [search], (err, result) => {
    if (err) throw err;
    shuffleResult = result.sort((a, b) => 0.5 - Math.random());
    res.json(shuffleResult);
  });
});

router.get("/tutors", (req, res) => {
  let search = req.query.search;
  search = "%" + search + "%";

  const query =
    "SELECT U.id, U.name, U.email, U.university, U.photo, T.skills, T.description, T.rate FROM Tutors T INNER JOIN Users U ON T.user_id = U.id WHERE T.skills LIKE ?";

  connection.query(query, [search], (err, result) => {
    if (err) throw err;
    shuffleResult = result.sort((a, b) => 0.5 - Math.random());
    res.json(shuffleResult);
  });
});

module.exports = router;
