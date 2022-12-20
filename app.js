const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});

mongoose.connect("mongodb://localhost:27017/rest", { useNewUrlParser: true });

const userschema = {
  name: String,
  college: String,
};

const User = mongoose.model("User", userschema);

app
  .route("/home")
  .get((req, res) => {
    User.find((err, names) => {
      res.send(names);
    });
  })
  .post((req, res) => {
    console.log(req.body.name);
    console.log(req.body.college);

    const newentry = new User({
      name: req.body.name,
      college: req.body.college,
    });
    newentry.save((err) => {
      if (!err) {
        res.send("sucsesfully stored a new entry");
      } else {
        res.send(err);
      }
    });
  });
