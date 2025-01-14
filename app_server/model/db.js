const DB_PATH =
  "mongodb+srv://kelompokLCI:lcigroup4@cluster75046.nlkmkie.mongodb.net/dbproduct?retryWrites=true&w=majority&appName=Cluster75046";

const mongoose = require("mongoose");

mongoose.connect(DB_PATH);
const connect = mongoose.connection;

connect.once("open", () => {
  console.log("Connected to Database");
});
connect.on("error", () => {
  console.log("Connection Failed");
  process.exit();
});
