const express = require("express");
const connection = require("../../helpers/db");
const router = express.Router();

router.post("/signup", function (req, res, next) {
    const formData = req.body;
    connection.query("INSERT INTO users SET ?", formData, (err, results) => {
        if (err) {
            res.status(500).send({ flash: err.message });
        } else {
            res.status(200).send({ flash: "User has been signed up !" });
        }
    });
});

router.get("/signup", function (req, res, next) {
    connection.query('SELECT * from users', (err, results) => {

        if (err) {
            res.status(500).send('Erreur lors de la récupération du contenu');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;


