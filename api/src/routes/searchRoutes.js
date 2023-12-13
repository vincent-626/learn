const express = require("express");
const router = express.Router();
const { connection, redisClient } = require("../db/db");

const EXPIRATION_TIME = 60;

router.get("/learners", async (req, res) => {
  let search = req.query.search ? req.query.search : "";

  if (search === "") {
    learners = await redisClient.get("learners");
    if (learners) {
      res.json(JSON.parse(learners));
    } else {
      const query =
        "SELECT U.id, U.name, U.email, U.university, U.photo, L.skills, L.description, L.rate FROM Learners L INNER JOIN Users U ON L.user_id = U.id";

      connection.query(query, (err, result) => {
        if (err) throw err;
        redisClient.set("learners", JSON.stringify(result));
        redisClient.expire("learners", EXPIRATION_TIME);
        res.json(result);
      });
    }
  } else {
    search = "%" + search + "%";

    const query =
      "SELECT U.id, U.name, U.email, U.university, U.photo, L.skills, L.description, L.rate FROM Learners L INNER JOIN Users U ON L.user_id = U.id WHERE L.skills LIKE ?";

    connection.query(query, [search], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
});

router.get("/tutors", async (req, res) => {
  let search = req.query.search ? req.query.search : "";

  if (search === "") {
    tutors = await redisClient.get("tutors");
    if (tutors) {
      res.json(JSON.parse(tutors));
    } else {
      const query =
        "SELECT U.id, U.name, U.email, U.university, U.photo, T.skills, T.description, T.rate FROM Tutors T INNER JOIN Users U ON T.user_id = U.id";

      connection.query(query, (err, result) => {
        if (err) throw err;
        redisClient.set("tutors", JSON.stringify(result));
        redisClient.expire("tutors", EXPIRATION_TIME);
        res.json(result);
      });
    }
  } else {
    search = "%" + search + "%";

    const query =
      "SELECT U.id, U.name, U.email, U.university, U.photo, T.skills, T.description, T.rate FROM Tutors T INNER JOIN Users U ON T.user_id = U.id WHERE T.skills LIKE ?";

    connection.query(query, [search], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
});

module.exports = router;
