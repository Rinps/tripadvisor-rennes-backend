// Load packages
const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
require("dotenv").config();
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUNAPI,
  domain: process.env.MAILGUNDOMAIN,
});

router.post("/submit", async (req, res) => {
  // Allow a user to submit the form. Require these BODY arguments : "firstname", "lastname", "email", "subject" and "description" (optionnal);
  try {
    // Extract datas from the request and create an object named newData.
    const firstname = req.fields.firstname;
    const lastname = req.fields.lastname;
    const email = req.fields.email;
    const subject = req.fields.subject;
    const description = req.fields.description;
    if (firstname && lastname && email && subject) {
      const newData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        subject: subject,
        description: description,
      };

      // Send an email using Mailgun API
      const mail = {
        from: "Guillaume <me@samples.mailgun.org>",
        to: newData.email,
        subject: newData.subject,
        text: newData.description,
      };
      mailgun.messages().send(mail, (error, body) => {
        console.log(body);
      });

      res.status(200).json({ message: "Nice!" });
    } else {
      res
        .status(412)
        .json({ message: "At least one mandatory parameter is missing." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
