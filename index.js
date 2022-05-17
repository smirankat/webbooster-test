const express = require("express");
const cors = require("cors");
const mailer = require("./nodemailer");

const app = express();

const PORT = 3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));
app.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
  const message = {
    to: "test@mailer.ru",
    subject: "The product added successfully!",
    html: `
          <h2>The product added to ${req.body.userName}'s cart</h2>

          <i>The details of the order are following:</i>
          <ul>
              <li>Name: ${req.body.userName}</li>
              <li>Phone number:${req.body.userPhone}</li>
              <li>Product: ${req.body.productName}</li>
          </ul>
          <p>This letter does not require a response<p>`,
  };
  mailer(message);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => console.log(`server listening ...`));
