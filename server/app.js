const express = require("express");

const app = express();

const users = require("./models/users");

app.get("/users", function (req, res) {
  if (users.length === 0) {
    res.status(404).send("no users found");
  }
  res.status(200).send({
    message: "Users found",
    users: users,
  });
});

app.use(express.json()); // the data is parssed form raw json data in to javascript object to manuiplate the data

app.post("/users/createUser", function (req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("name is required");
  }
  const newUser = {
    id: users.length,
    name: name,
  };
  users.push(newUser);
  res.status(200).send(users);
});

app.delete("/users/delete/:id", function (req, res) {
  const id = parseInt(req.params.id); // Convert ID to a number
  const index = users.findIndex(function (user) {
    return user.id === id; // the current id is equal to the id
  }); // Find user index

  if (index === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(index, 1); // Remove the user
  res.status(200).send({ message: "User deleted", users }); // Send response
});

app.get("/users/:id", function (req, res) {
  const id = req.params.id;

  const user = users[id];
  if (!user) {
    return res.status(404).send("user not found");
  }
  res.status(200).send(user);
});

module.exports = app;
