const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "fill all inputs" });
    }
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        console.log("userExist.password: ", userExist.password, password);
        const isMatch = await bcrypt.compare(password, userExist.password);
        console.log("isMatch: ", isMatch);
        if (isMatch) {
          const token = jwt.sign(
            { email },
            "DJHASJHDJHDJSHDJHJDHIWEIQRIIYSDG",
            {
              expiresIn: "2h",
            }
          );
          User.token = token;
          return res.status(200).json({ token, message: "login successfull" });
        } else {
          return res.status(400).json({ message: "Invalid login details" });
        }
      } else {
        return res.status(400).json({ message: "Invalid login details" });
      }
    } catch (e) {
      console.log(e);
    }
  },

  async signUp(req, res) {
    console.log("req.body: ", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({ error: "fill all inputs" });
    }

    try {
      const userExist = await User.findOne({ email: email });
      console.log("userExist: ", userExist);
      if (userExist) {
        return res.status(422).json({ error: "Email already Exist" });
      } else {
        const user = new User({ name, email, password });
        await user.save();
        res.status(200).json({ message: "data successfull added" });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
