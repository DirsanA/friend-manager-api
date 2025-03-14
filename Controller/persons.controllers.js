const persons = require("../models/persons.models");
function addPerson(req, res) {
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
}

// get All person
function getPerson(req, res) {
  if (persons.length === 0) {
    return res.status(404).send("No persons found");
  }
  return res.status(200).json(persons); // Use JSON response
}

// get One person
function getById(req, res) {
  const id = parseInt(req.params.id, 10); // Convert string to number
  const person = persons[id];

  if (!person) {
    return res.status(404).send("Person not found");
  }
  return res.status(200).json(person);
}

module.exports = {
  getById,
  getPerson,
  addPerson,
};
