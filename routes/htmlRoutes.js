const express = require("express");
const router = express.Router();
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig.development);


// Load index page
// index page 
router.get("/", (req, res) => {
    res.render("pages/main");
});

router.get("/display", (req, res) => {
    knex
        .select()
        .from("user")
        .then(results => res.render("pages/index", {users: results}));
});



module.exports = router;
