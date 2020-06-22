const express = require("express");
const router = express.Router();
const connection = require('../../helpers/db.js');

router.get("/signup", function (req, res, next) {
    connection.query('SELECT * from users', (err, results) => {

        if (err) {
            res.status(500).send('Erreur lors de la récupération du contenu');
        } else {
            res.json(results);
        }
    });
});


router.post("/signup", function (req, res, next) {
    const formData = req.body;
    connection.query("INSERT INTO users SET ?", formData, (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.sendStatus(200);
        }
    });
});




module.exports = router;