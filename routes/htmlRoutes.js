const path = require("path");
const router = require("express").Router();
const { isAuthenticated } = require("../config/middleware/isAuthenticated");

const db = require("../models");

const dir = function(ejsFileName) {
    return path.join(__dirname, `../public/views/pages/${ejsFileName}`);
};

// Home Page
router.get("/", (req, res) => {
    db.User.findAll({
        attributes: ["id", "username", "email", "description", "createdAt", "updatedAt"],
        include: [
            {
                model: db.SkillToLearn,
                as: "skillsLearning",
                attributes: ["skillId", "createdAt", "updatedAt"]
            },
            {
                model: db.SkillToTeach,
                as: "skillsTeaching",
                attributes: ["skillId", "createdAt", "updatedAt"]
            }
        ]
    }).then(userResults => {
        db.Skill.findAll({
            include: [
                {
                    model: db.SkillToLearn,
                    as: "usersLearning",
                    attributes: ["userId", "createdAt", "updatedAt"]
                },
                {
                    model: db.SkillToTeach,
                    as: "usersTeaching",
                    attributes: ["userId", "createdAt", "updatedAt"]
                }
            ]
        }).then(skillResults => {
            res.render(dir("index.ejs"), {
                users: userResults,
                skills: skillResults
            });
        });
    });
});

// Send login page
router.get("/login", (req, res) => {

    // UPDATE THIS LATER ---------- Want to redirect users who are logged in

    // if (req.user) {
    //     res.redirect("/");
    // }
    res.render(dir("login.ejs"));
});

// Register a new user
router.get("/register", (req, res) => {
    db.Skill.findAll({
        attributes: ["id", "name"]
    }).then(skills => {
        res.render(dir("register.ejs"), {
            skills: skills
        });
    });
});

// Contact Page
router.get("/contact", (req, res) => {
    res.render(dir("contact.ejs"));
});

// Email skill.it user
router.get("/email", (req, res) => {
    res.render(dir("email.ejs"));
});

// About skill.it
router.get("/about", (req, res) => {
    res.render(dir("about.ejs"));
});

// Test route for ensuring Authentication
router.get("/testAuthed", isAuthenticated, (req, res) => {
    res.render(dir("test.ejs"));
});

// Welcomes the user and tells them if they are logged in
router.get("/testIfAuthed", (req, res) => {
    res.render(dir("testIf.ejs"), {
        user: req.user
    });
});

module.exports = router;