const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// User Model
const db = require("../models");

// route for signing up
router.post("/register", (req, res) => {
    const { username, email, password, password2, toTeach, toLearn, description, agreeBox} = req.body;
    const errors = [];

    // Check required fields
    if (!(username && email && password && password2 && toTeach && toLearn)) {
        errors.push({msg: "Please fill in all fields"});
    }

    if (!agreeBox) {
        errors.push({msg: "Please agree to terms and conditions"});
    }

    // Check if passwords match
    if (password !== password2) {
        errors.push({msg: "Passwords do not match"});
    }

    // Check password length
    if (password.length < 6) {
        errors.push({msg: "Password must be at least 6 characters"});
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            username,
            email,
            description
        });
    } else {
        // Validation Passed
        db.User.findOne({
            where: {
                username: username
            }
        }).then(response => {
            if (response) {
                // User exists already
                errors.push({msg: "Username is already registered"});
                res.render("register", {
                    errors,
                    username,
                    email,
                    description
                });
            } else {
                db.User.create({
                    username: username,
                    email: email,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                    description: description
                }).then(newUser => {

                    // Adding the toLearn skill
                    db.Skill.findOne({
                        where: {
                            name: toLearn
                        }
                    }).then(skill => {
                        //   id at skill.dataValues.id
                        // name at skill.dataValues.name

                        // handler for a new skill
                        // if (!skill) {
                        //     // create new skill
                        // }
                        db.SkillToLearn.create({
                            userId: newUser.dataValues.id,
                            skillId: skill.dataValues.id
                        });
                    });

                    // Adding the toTeach skill
                    db.Skill.findOne({
                        where: {
                            name: toTeach
                        }
                    }).then(skill => {
                        db.SkillToTeach.create({
                            userId: newUser.dataValues.id,
                            skillId: skill.dataValues.id
                        });
                    });
<<<<<<< HEAD
=======
                    // console.log("toLearn: " + toLearn);
                    // console.log("toTeach: " + toTeach);
                    // console.log(newUser.dataValues);
>>>>>>> 15d1de3a2d3a5548ee56868014e410c4f920cbb5
                    req.flash("successMsg", "You are now registered and can log in");
                    res.redirect("/login");
                });
            }
        });
    }
});

// route for logging in
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
});

// route for logging out
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login"); // redirect to login page
});

module.exports = router;