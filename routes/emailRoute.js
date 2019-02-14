const path = require("path");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


router.post("/send", (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li> Name:  ${req.body.name}</li>
        <li> Username:  ${req.body.username}</li>
        <li> Email:  ${req.body.email}</li>
        <li> Message:  ${req.body.message}</li>
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
        text: "Hello world?", // plain text body
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

        res.render(path.join(__dirname, "../public/views/pages/contact.ejs", {msg: "Your email has been sent!"}));
    });
});

module.exports = router;