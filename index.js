const express = require("express");

const app = express();
const port = 5000;

app.use(express.json()); // Moved this to the top to ensure body parsing

const persons = [
  { id: 0, name: "Samuel Antehun" },
  { id: 1, name: "Kalkidan Antehun" },
  { id: 2, name: "Cherenet Antehun" },
];

// Get all persons
app.get("/", function (req, res) {
  if (persons.length === 0) {
    return res.status(404).send("No persons found");
  }
  return res.status(200).json(persons); // Use JSON response
});

// Get person by ID
app.get("/:id", function (req, res) {
  const id = parseInt(req.params.id, 10); // Convert string to number
  const person = persons.find((p) => p.id === id); // Find person by ID

  if (!person) {
    return res.status(404).send("Person not found");
  }
  return res.status(200).json(person);
});

// Add a new person
app.post("/add", function (req, res) {
  const personName = req.body.name;
  if (!personName) {
    return res.status(400).send("Please fill in the name"); // Use 400 for bad request
  }

  const newPerson = {
    id: persons.length,
    name: personName,
  };

  persons.push(newPerson);
  return res
    .status(201)
    .json({ message: "Person added successfully", person: newPerson });
});

// Start the server
app.listen(port, function () {
  console.log(`Server is listening at port ${port}`);
});
