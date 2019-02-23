const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const db = require("../models");

/*
    User-related Routes
*/

// get all users
router.get("/api/users", (req, res) => {
    db.User
        .findAll({
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
        })
        .then(results => res.json(results));
});

// get a specific user
router.get("/api/users/:id", (req, res) => {
    db.User
        .findOne({
            attributes: ["id", "username", "email", "description", "createdAt", "updatedAt"],
            where: {
                id: req.params.id
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
        })
        .then(results => res.json(results));
});

// Creates a new skill
router.post("/api/skills", (req, res) => {
    const { skillName } = req.body;

    db.Skill.findOrCreate({
        where: {
            name: skillName
        }
    }).then(skill => {
        const created = skill[1];
        if (created) {
            req.flash("successMsg", "Skill successfully created! Add it to teach or learn below.");
            res.redirect("/profile");
        } else {
            req.flash("errorMsg", "That skill is already on our list!");
            res.redirect("/profile");
        }
    });
});

// Send email
router.post("/send", (req, res) => {
    const output = `
    <p>Someone is interested in trading skills with you!</p>
    <h3>Contact Details</h3>
    <ul>
        <li> Name:  ${req.body.username}</li>
        <li> Email:  ${req.body.email}</li>
        <li> Subject:  ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "f59521f36620f1",
            pass: "c5326e1eafb86a"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    const mailOptions = {
        from: "\"skill.it Contact\" <skill-it.com>\"", // sender address
        to: "7c407cd915-696e26@inbox.mailtrap.io", // list of receivers
        subject: "A skill.it user would like to contact you!", // Subject line
        text: "Hello world!", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        req.flash("successMsg", "Your email has been sent!");
        res.redirect("/");
    });

});

// Update user Bio
router.post("/updateDescription", (req, res) => {
    const { newDescription } = req.body;
    
    db.User.update(
        { description: newDescription },
        {
            fields: ["description"],
            where: {
                id: req.user.dataValues.id
            }
        }
    ).then(() => {
        req.flash("successMsg", "Description successfully updated");
        res.redirect("/profile");
    });
});

// Update user's email
router.post("/updateEmail", (req, res) => {
    const { newEmail } = req.body;
    
    db.User.update(
        { email: newEmail },
        {
            fields: ["email"],
            where: {
                id: req.user.dataValues.id
            }
        }
    ).then(() => {
        req.flash("successMsg", "Email address successfully updated");
        res.redirect("/profile");
    });
});

// Remove skill from user's ToTeach
router.delete("/api/users/skills/toTeach", (req) => {
    const { skillId } = req.body;

    db.SkillToTeach.destroy({
        where: {
            $and: {
                userId: req.user.dataValues.id,
                skillId: skillId
            }
        }
    });
});

// Add new skill to user's ToTeach
router.post("/api/users/skills/toTeach", (req, res) => {
    const { toTeach } = req.body;

    db.Skill.findOrCreate({
        where: {
            name: toTeach
        }
    }).then(skill => {
        db.SkillToTeach.findOrCreate({
            where: {
                userId: req.user.dataValues.id,
                skillId: skill[0].dataValues.id
            }
        }).then(skill => {
            const created = skill[1];
            if (created) {
                req.flash("successMsg", "Skill to Teach successfully added!");
                res.redirect("/profile");
            } else {
                req.flash("errorMsg", "You're already teaching that skill!");
                res.redirect("/profile");
            }
        });
    });
});

// Remove skill from user's ToLearn
router.delete("/api/users/skills/toLearn", (req) => {
    const { skillId } = req.body;

    db.SkillToLearn.destroy({
        where: {
            $and: {
                userId: req.user.dataValues.id,
                skillId: skillId
            }
        }
    });
});

// Add new skill to user's ToLearn
router.post("/api/users/skills/toLearn", (req, res) => {
    const { toLearn } = req.body;

    db.Skill.findOrCreate({
        where: {
            name: toLearn
        }
    }).then(skill => {
        db.SkillToLearn.findOrCreate({
            where: {
                userId: req.user.dataValues.id,
                skillId: skill[0].dataValues.id
            }
        }).then(skill => {
            const created = skill[1];
            if (created) {
                req.flash("successMsg", "Skill to Learn successfully added!");
                res.redirect("/profile");
            } else {
                req.flash("errorMsg", "You're already learning that skill!");
                res.redirect("/profile");
            }
        });
    });
});

module.exports = router;