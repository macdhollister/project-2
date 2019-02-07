const express = require("express");
const router = express.Router();

const db = require("../models");

/*
    User-related Routes
*/

// get all users
router.get("/api/users", (req, res) => {
    db.User
        .findAll({
            include: [db.SkillToLearn, db.SkillToTeach]
        })
        .then(results => res.json(results));
});

// get a specific user
router.get("/api/users/:id", (req, res) => {
    db.User
        .findOne({
            where: {
                id: req.params.id
            },
            include: [db.SkillToLearn, db.SkillToTeach]
        })
        .then(results => res.json(results));
});

/*
    Skill-related Routes
*/

// get all skills
router.get("/api/skills", (req, res) => {
    db.Skill
        .findAll({
            include: [db.SkillToLearn, db.SkillToTeach]
        })
        .then(results => res.json(results));
});

// get a specific skill
router.get("/api/skills/:id", (req, res) => {
    db.Skill
        .findOne({
            where: {
                id: req.params.id
            },
            include: [db.SkillToLearn, db.SkillToTeach]
        })
        .then(results => res.json(results));
});

module.exports = router;