const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "price.collins67@ethereal.email",
      pass: "wXqhwQzcGtqQaunYva",
    },
  },
  {
    from: "Mailer Test <price.collins67@ethereal.email>",
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Email sent: ", info);
  });
};

module.exports = mailer;
