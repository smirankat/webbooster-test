const express = require("express");
const cors = require("cors");
const mailer = require("./nodemailer");

const app = express();

const PORT = 3001;
// let user = undefined;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));
app.post("/", (req, res) => {
  // if (req.body.user_name && req.body.user_phone)
  // {
  //     return res.sendStatus(400);
  //   }
  console.log(req.body);
  res.json(req.body);
  // res.send(`${req.body.user_name} - ${req.body.user_phone}`);
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
  // user = req.body;
  //   res.redirect("/");
});
app.get("/", (req, res) => {
  //   if (!req.body.user_name || !req.body.user_phone) {
  res.sendFile(__dirname + "/index.html");
  //   } else {
  //     res.send(`The product added successfully!`);
  //   }
  //   user = undefined;
});

app.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
