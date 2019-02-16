const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../models");
const { isAuthenticated } = require("../config/middleware/isAuthenticated");

const dir = function (ejsFileName) {
    return path.join(__dirname, `../public/views/pages/${ejsFileName}`);
};

router.get("/chat/:otherUserId", isAuthenticated, (req, res) => {
    db.User.findOne({
        attributes: ["id", "username", "email", "description", "createdAt", "updatedAt"],
        where: {
            id: req.params.otherUserId
        }
    }).then(otherUser => {
        res.render(dir("chat.ejs"), {
            sender: req.user,
            receiver: otherUser
        });
    });
});

module.exports = router;