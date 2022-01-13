const express = require("express")
const router = express.Router();
const authController = require("../controllers/authController")
const verifyUser = require("../middlewares/verifyUser")

router.post("/login", authController.login);

router.post("/signUp", authController.signUp);

module.exports = router;
