const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/Astics";
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successfull");
  })
  .catch((e) => {
    console.log("no connection");
  });
