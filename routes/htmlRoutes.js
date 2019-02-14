const path = require("path");
const router = require("express").Router();

const dir = function(ejsFileName) {
    return path.join(__dirname, `../public/views/pages_testing/${ejsFileName}`);
};

// Home page
router.get("/", (req, res) => {
    res.render(dir("index.ejs"));
});

// Send login page
router.get("/login", (req, res) => {

    // UPDATE THIS LATER ---------- Want to redirect users who are logged in

    // if (req.user) {
    //     res.redirect("/");
    // }
    res.render(dir("login.ejs"));
});

// Signup a new user
router.get("/signup", (req, res) => {
    res.render(dir("register.ejs"));
});

// Contact Page
router.get("/contact", (req, res) => {
    res.render(dir("contact.ejs"));
});

// About skill.it
router.get("/email", (req, res) => {
    res.render(dir("email.ejs"));
});

// About skill.it
router.get("/about", (req, res) => {
    res.render(dir("about.ejs"));
});

module.exports = router;