/*

POST - new user
POST - login
GET - get user data
POST - skills to learn
POST - skills to teach

--------------------------

Later:
Delete account
Update bio
Update password
Update email address (?)

*/


// const db = require("../models");
const express = require("express");
const router = express.Router();

// Get data for a user
router.get("/api/users/:id", (req, res) => {
    console.log(res);
});

// Register a new user
router.post("/register", (req, res) => {
    console.log(res);
});

// Login a user
router.post("/login", (req, res) => {
    console.log(res);
});

// Getting skill names to learn
router.get("/api/users/:id/learn", (req, res) => {
    console.log(res);
});

// Add a skill to learn
router.post("/api/users/:id/learn", (req, res) => {
    console.log(res);
});

// Getting skill names to teach
router.get("/api/users/:id/teach", (req, res) => {
    console.log(res);
});

// Add a skill to teach
router.post("/api/users/:id/teach", (req, res) => {
    console.log(res);
});

module.exports = router;