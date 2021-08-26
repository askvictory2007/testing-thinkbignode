

const express = require("express");
const cors = require("cors");

const app = express();
const multiparty = require("multiparty");


var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
res.send({
          success: true,
          message: 'Working'
        });
})
app.post("/contact", (req, res) => {
  var nodeMailer = require('nodemailer');
   try {
  let transporter = nodeMailer.createTransport({
  service: 'gmail',
    auth: {
      user: "askvictory2007@gmail.com",
      pass: "askvict2007",
    },
  });
    const mailOptions = {
    //   from: req.body.email, // sender address
      to: "askvictory2007@gmail.com", // list of receivers
      subject: req.body.subject, // Subject line
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
         <li>Phone Number: ${req.body.phonenumber}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Something went wrong. Try again later'
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for contacting us. We will get back to you shortly'
        });
      }
    });
  } catch (error) {

    res.status(500).send({
      success: false,
      message: 'Something went wrong. Try again later'
    });
  }
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
