// require library
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/contact_list_db");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to db"));

db.once("open", function () {
  console.log("succesfully connected to database");
});
