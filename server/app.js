const express = require("express");
const userModel = require("./models/users.model");
const app = express();

app.use(express.json());
// posting user
app.post("/users/createUser", async function (req, res) {
  try {
    // Create user
    const user = await userModel.create(req.body);

    return res.status(201).send({
      message: "The user is created",
      data: user,
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    return res.status(400).send({
      message: "The user could not be created",
      error: err.message, // Provide error details in response
    });
  }
});

//getting all user

app.get("/users", async function (req, res) {
  try {
    const users = await userModel.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// deleting the user

app.delete("/users/:id", async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("the id is not found");
    }
    const user = await userModel.findByIdAndDelete(id);
    return res.status(200).send("User deleted successfully");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = app;
