require("./db");
const express = require("express");
// const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" }));
const userRoute = require("./routes/user.route");
const contactRoute = require("./routes/contacts.route");

app.use('/users', userRoute);
app.use('/contacts', contactRoute);
// app.use(cors());

////////////////////////////////////////////////
app.get("/", (req, res) => {
  ////////////////////////////////////////////////
  /* 
    Default welcome page when accessing the port
    via Browser                               
    */
  ///////////////////////////////////////////////

  res.send(
    "Welcome to the Node JS Starter Kit"
  );
});

module.exports = app;

