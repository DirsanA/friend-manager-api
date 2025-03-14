const express = require("express");
const personController = require("./Controller/persons.controllers");
const app = express();
const port = 5000;

app.use(express.json()); // Moved this to the top to ensure body parsing

// Get all persons
app.get("/", personController.getPerson);

// Get person by ID
app.get("/:id", personController.getById);

// Add a new person
app.post("/add", personController.addPerson);

// Start the server
app.listen(port, function () {
  console.log(`Server is listening at port ${port}`);
});
