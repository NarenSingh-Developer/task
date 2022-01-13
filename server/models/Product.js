const mongoose = require("mongoose");

const products = new mongoose.Schema({
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Product = mongoose.model("products", products);

module.exports = Product;
