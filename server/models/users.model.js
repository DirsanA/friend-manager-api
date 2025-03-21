const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
  name: String,
  email: String,
});
const userModel = mongoose.model("users", userScema);
module.exports = userModel;
