const express = require("express");

const app = express();

const users = [
  {
    id: 0,
    name: "Samuel Antehun",
  },
  {
    id: 1,
    name: "Dirsan Antehun",
  },
  {
    id: 2,
    name: "Hani Antehun",
  },
];

// getting all user

app.get("/users", function (req, res) {
  res.status(200).send({
    message: "sucess",
    data: users,
  });
});

// getting user by its id

app.get("/users/:id", function (req, res) {
  const id = req.params.id;
  const user = users[id];

  if (!user) {
    return res.status(404).send("EROR: User not found ");
  }
  return res.status(200).send(user);
});
// adding user by post

app.use(express.json());
app.get("/users/add", function (req, res) {
  const newUserName = req.body.name;

  if (!newUserName) {
    return res.status(400).send({
      message: "Error :User Name is required",
    });
    const newUser = {
      name: newUserName,
      id: users.length,
    };
    users.push(newUser);
    return res.status(200).send({
      message: "Added sucessfuly",
      data: newUser,
    });
  }
});

const PORT = 5000;
app.listen(PORT, function () {
  console.log(`The server is running on port ${PORT}`);
});
