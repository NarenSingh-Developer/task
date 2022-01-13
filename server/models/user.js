const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const users = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
      type: String,
  },
  password: {
    type: String,
  },
});

users.pre("save", async function () {
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12);
  }
})

const User = mongoose.model("users", users);

module.exports = User;
