const express = require("express");
const connection = require("../../helpers/db");
const router = express.Router();

router.post("/signup", function (req, res, next) {
  const formData = req.body;
  connection.query("INSERT INTO users SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send({flash: err.message});
    } else {
      res.status(200).send({flash: "User has been signed up !"});
    }
  });
});

module.exports = router;