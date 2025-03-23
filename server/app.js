const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const userModel = require("./models/users.model");

const app = express();

// Use CORS
app.use(cors());

app.use(express.json());

// POST endpoint to create user
app.post("/users/createUser", async function (req, res) {
  try {
    const { name, email } = req.body;
    const user = await userModel.create({ name, email });

    return res.status(201).send({
      message: "The user is created",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: "The user could not be created",
      error: err.message,
    });
  }
});

// GET endpoint to fetch users
app.get("/users", async function (req, res) {
  try {
    const users = await userModel.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// DELETE endpoint to delete user
app.delete("/users/:id", async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("the id is not found");
    }
    await userModel.findByIdAndDelete(id);
    return res.status(200).send("User deleted successfully");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = app;
