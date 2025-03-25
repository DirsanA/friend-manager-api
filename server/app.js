const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/users.model");

const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json());

// ✅ Create a new user
app.post("/users/createUser", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.create({ name, email });

    return res.status(201).send({
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: "User could not be created",
      error: err.message,
    });
  }
});

// ✅ Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// ✅ Get a single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// ✅ Delete user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID format" });
  }

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send("User successfully deleted");
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).send("Internal server error");
  }
});

// ✅ Update user by ID
app.put("/users/update/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID format" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send("User updated successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

module.exports = app;
