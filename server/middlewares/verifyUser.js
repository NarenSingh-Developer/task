const User = require("../models/user");
const jwt = require("jsonwebtoken")

 const verifyToken = async (req, res, next) => {
    const token =
      req.headers["authorization"] || req.body.token || req.params.token;
    console.log("token: ", token);
  
    if (!token) {
      return res.send("A token is required for authentication");
    }
  
    try {
      const decoded = jwt.verify(token, "DJHASJHDJHDJSHDJHJDHIWEIQRIIYSDG");
      console.log('decoded: ', decoded);
      const userfind = await User.findOne({ email: decoded.email });
  
      if (!userfind) {
        return res.status(401).json({message: "invalid user"});
      }
      req.email = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({message: "Invalid User"})
    }
  };

module.exports = verifyToken;