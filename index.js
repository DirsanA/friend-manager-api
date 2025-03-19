const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

const users = [
  { id: 0, name: "Samuel Antehun" },
  { id: 1, name: "Dirsan Antehun" },
  { id: 2, name: "Hani Antehun" },
];

// Getting all users
app.get("/users", function (req, res) {
  res.status(200).send({
    message: "Success",
    data: users,
  });
});

// Getting a user by ID
app.get("/users/:id", function (req, res) {
  const id = parseInt(req.params.id); // Ensure id is an integer
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).send({ message: "ERROR: User not found" });
  }
  return res.status(200).send(user);
});

// Adding a user (should be a POST request)
app.post("/users/add", function (req, res) {
  const newUserName = req.body.name;

  if (!newUserName) {
    return res.status(400).send({ message: "Error: User Name is required" });
  }

  const newUser = {
    id: users.length, // Assigning a new ID
    name: newUserName,
  };

  users.push(newUser);
  return res.status(201).send({ message: "Added successfully", data: newUser });
});

const PORT = 5000;
app.listen(PORT, function () {
  console.log(`The server is running on port ${PORT}`);
});
