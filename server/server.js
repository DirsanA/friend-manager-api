const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const server = http.createServer(app);

mongoose
  .connect("mongodb://localhost:27017/user")
  .then(function () {
    console.log("the mongoDB is connected");
    server.listen(9000, function () {
      console.log("the server is listening on port 9000");
    });
  })
  .catch(function (err) {
    console.log("the mongoDB is not connected", err);
  });
