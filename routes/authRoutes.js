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

router.post("/updatePassword", (req, res) => {
    console.log(req.user.dataValues.id);

    // asks for current password as well as the updated password
    const { current, newPass, newPassConfirm } = req.body;
    const errors = [];

    bcrypt.compare(current, req.user.dataValues.password, (err, isMatch) => {
        if (err) { throw err; }

        if (!isMatch) {
            errors.push({msg: "Incorrect current password"});
        }

        if (newPass !== newPassConfirm) {
            errors.push({msg: "Updated passwords do not match"});
        }

        if (newPass.length < 6) {
            errors.push({msg: "Password must be at least 6 characters"});
        }

        if (errors.length > 0) {
            // re-render current page
            res.render("profile", {
                errors
            });
        } else {
            db.User.update(
                { password: bcrypt.hashSync(newPass, bcrypt.genSaltSync(10)) },
                {
                    fields: ["password"],
                    where: {
                        id: req.user.dataValues.id
                    }
                }
            ).then(response => {
                req.flash("successMsg", "Password successfully updated");
                res.redirect("/profile");
            });
        }
    });
});

module.exports = router;