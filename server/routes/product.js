const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);
router.post("/add", productController.addProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
