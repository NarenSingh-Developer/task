const router = require("express").Router();
const authRoute = require("./authRoute")
const product = require("./product")
const verifyUser = require("../middlewares/verifyUser")

router.use("/auth", authRoute)
router.use("/product",product)
router.post("/authCheck", verifyUser, (req,res) => {
    res.status(200).send("Dashboard");
})
module.exports = router;
