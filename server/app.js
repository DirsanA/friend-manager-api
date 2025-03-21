const express = require("express");
const userModel = require("./models/users.model");
const app = express();

app.post("/user/createUser", function (req, res) {
  userModel.create(req.body, function (err, data) {
    if (err) {
      return res.status(500).send("Something went wrong");
    }
    return res.status(201).send({
      message: "User created successfulluy",
      data: data,
    });
  });
});

module.exports = app;
