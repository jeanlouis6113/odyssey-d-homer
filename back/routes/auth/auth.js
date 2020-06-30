const express = require("express");
const connection = require("../../helpers/db");
const router = express.Router();
const bcrypt = require('bcrypt');
const  passport = require ('../../helpers/passport');
const jwt = require("jsonwebtoken");


router.post("/signup", function (req, res, next) {
  let formData = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    lastname: req.body.lastname
  };
  connection.query("INSERT INTO users SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send({ flash: err.message });
    } else {
      res.status(200).send({ flash: "User has been signed up !" });
    }
  });
});

router.post("/signin", (req, res) => {
  
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return res.status(500).send(err);
      }
      if (!user) {
          return res.status(400).json({message: info.message});
      }
      const token = jwt.sign(user, 'password', { expiresIn: 1000 });
      return res.json({user, token, message: info.message});
  })(req, res);
});

module.exports = router;