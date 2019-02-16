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

// Home Page (with results from search)
router.post("/search", (req, res) => {
    console.log(req.body.skillName);
    db.Skill.findOne({
        attributes: ["id"],
        where: {
            name: req.body.skillName
            // name: "music"
        }
    }).then(skillRes => {
        // skill id in skillRes.dataValues.id
        db.SkillToTeach.findAll({
            where: {
                skillId: skillRes.dataValues.id
            }
        }).then(userIdRes => {
            for (let i = 0; i < userIdRes.length; i++) {
                userIdRes[i] = userIdRes[i].dataValues.userId;
            }

            db.User.findAll({
                attributes: ["id", "username", "email", "description", "createdAt", "updatedAt"],
                where: {
                    id: userIdRes
                },
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
    });
});

// Send login page
router.get("/login", (req, res) => {
    // User already logged in
    if (req.user) {
        // add a flash message in here -- already logged in
        res.redirect("/");
    }
    res.render(dir("login.ejs"));
});

// Register a new user
router.get("/register", (req, res) => {
    // User already logged in
    if (req.user) {
        // add a flash message in here -- already logged in
        res.redirect("/");
    }
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

router.get("/profile", isAuthenticated, (req, res) => {
    db.SkillToTeach.findAll({
        where:
            {
                userId: req.user.dataValues.userId
            }
    }).then(teachResults => {
        for (let i = 0; i < teachResults.length; i++) {
            teachResults[i] = teachResults[i].dataValues.id;
        }
        db.SkillToLearn.findAll({
            where:
                {
                    userId: req.user.dataValues.userId
                }
        }).then(learnResults => {
            for (let i = 0; i < learnResults.length; i++) {
                learnResults[i] = learnResults[i].dataValues.id;
            }
            db.Skill.findAll({
                where:
                    {
                        id: [...teachResults, ...learnResults]
                    }
            }).then(skills => {
                res.render(dir("profile.ejs"), {
                    user: req.user,
                    teachResults: teachResults,
                    learnResults: learnResults,
                    skills: skills
                });
            });
        });
    });
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