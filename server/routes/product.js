const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/:page", productController.getProduct);
router.post("/sortdata", productController.getfilterProduct);
router.post("/add", productController.addProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
