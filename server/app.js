const express = require("express");
const userModel = require("./models/users.model");
const app = express();

app.use(express.json());
// posting user
app.post("/users/createUser", function (req, res) {
  userModel
    .create(req.body)
    .then(function (data) {
      res.send(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});

//getting all user

app.get("/users", function (req, res) {
  userModel.find({}).then(function (data) {
    return res.status(200).send(data);
  });
});

// deleting the user

app.delete("/users/:id", function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).send("the id is not found");
  }
  userModel.findByIdAndDelete(id).then(function () {
    return res.status(200).send("the user is deleted");
  });
});

module.exports = app;
