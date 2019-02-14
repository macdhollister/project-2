const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// const sequelize = require("sequelize");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 8080;

// Passport config
require("./config/passport")(passport);

// DB Config
const db = require("./models");

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./public/views/pages");

// Bodyparsing
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: "skill.it is awesome",
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash Messages
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("successMsg");
    res.locals.errorMsg = req.flash("errorMsg");
    res.locals.error = req.flash("error");
    next();
});

// Other Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

const dataRoutes = require("./routes/dataRoutes");
app.use(dataRoutes);

const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, console.log(`Server listening on PORT ${PORT}`));
});