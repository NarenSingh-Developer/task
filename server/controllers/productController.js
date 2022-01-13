const Product = require("../models/Product");

module.exports = {
  async getProduct(req, res) {
    try {
      const getallProducts = await Product.find();
      res.status(200).json({ getallProducts });
    } catch (e) {
      console.log(e);
    }
  },

  async getProductById(req, res) {
    const id = req.params.id;
    try {
      const getProductById = await Product.findById(id);
      res.status(200).json({ getProductById });
    } catch (e) {
      console.log(e);
    }
  },

  async addProduct(req, res) {
    const { name, brand, price } = req.body;

    if (!name || !brand || !price) {
      res.status(400).json({ error: "fill all inputs" });
    }
    try {
      await Product.create({ name, brand, price });
      res.status(200).json({ message: "Product added" });
    } catch (e) {
      console.log(e);
    }
  },

  async deleteProduct(req, res) {
    const id = req.params.id;
    try {
      await Product.findByIdAndRemove(id);
      res.status(200).json({ message: "Product deleted" });
    } catch (e) {
      console.log(e);
    }
  },
};
