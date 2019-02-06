const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt-nodejs");

const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig.development);

// create new user
router.post("/api/register", (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        description: req.body.description,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    };
    knex("user")
        .insert(userData)
        .then(results => {
            userData.id = results[0];
            res.status(201).json(userData);
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
});

module.exports = router;