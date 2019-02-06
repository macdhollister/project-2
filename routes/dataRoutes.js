const express = require("express");
const router = express.Router();

const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig.development);

/*
    User-related Routes
*/

// get all users
router.get("/api/users", (req, res) => {
    knex
        .select()
        .from("user")
        .then(results => res.json(results));
});

/*
    get a specific user's info

    - user's id
    - user's username
    - list of skills the user wants to learn
        - each skill's id
        - each skill's name
    - list of skills the user can teach
        - each skill's id
        - each skill's name
*/
router.get("/api/users/:id", (req, res) => {
    const userData = {};

    knex
        .select()
        .from("user")
        .where({ id: req.params.id })
        .then((results) => {
            userData.userId = results[0].id;
            userData.username = results[0].username;
            userData.email = results[0].email;
            userData.description = results[0].description;

            knex
                .select("skillsToLearn.skillId", "skill.skill")
                .from("skillsToLearn")
                .join("user", "user.id", "=", "skillsToLearn.userId")
                .join("skill", "skill.id", "=", "skillsToLearn.skillId")
                .where({ userId: req.params.id })
                .then(results => {
                    userData.learning = results;

                    knex
                        .select("skillsToTeach.skillId", "skill.skill")
                        .from("skillsToTeach")
                        .join("user", "user.id", "=", "skillsToTeach.userId")
                        .join("skill", "skill.id", "=", "skillsToTeach.skillId")
                        .where({ userId: req.params.id })
                        .then(results => {
                            userData.teaching = results;

                            res.json(userData);
                        });
                });
        });
});

/*
    Skill-related Routes
*/

// get all skills
router.get("/api/skills", (req, res) => {
    knex
        .select()
        .from("skill")
        .then(results => res.json(results));
});

router.get("/api/skills/:skill", (req, res) => {
    knex
        .select()
        .from("skill")
        .where({
            skill: req.params.skill
        })
        .then(results => res.json(results));
});


// get all skills a specific user wants to learn
router.get("/api/users/:id/learn", (req, res) => {
    knex
        .select()
        .from("skillsToLearn")
        .where({
            userId: req.params.id
        })
        .then(results => res.json(results));
});

// */
//     - skill's id
//     - skill's name
//     - list of users who want to learn the skill
//         - each user's id
//         - each user's username
//     - list of users who can teach the skill
//         - each user's id
//         - each user's username
// */
router.get("/api/skills/:id", (req, res) => {
    const skillData = {};
    
    knex
        .select()
        .from("skill")
        .where({ id: req.params.id })
        .then(results => {
            skillData.skillId = results[0].id;
            skillData.skill = results[0].skill;
            
            knex
                .select("skillsToLearn.userId", "user.username")
                .from("skillsToLearn")
                .join("user", "user.id", "=", "skillsToLearn.userId")
                .where({ skillId: req.params.id })
                .then(results => {
                    skillData.learners = results;

                    knex
                        .select("skillsToTeach.userId", "user.username")
                        .from("skillsToTeach")
                        .join("user", "user.id", "=", "skillsToTeach.userId")
                        .where({ skillId: req.params.id })
                        .then(results => {
                            skillData.teachers = results;

                            res.json(skillData);
                        });
                });
        });
});

module.exports = router;