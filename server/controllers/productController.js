const Product = require("../models/Product");

module.exports = {
  async getProduct(req, res) {
    const page = req.params.page;
    const PAGE_SIZE = 9;
    const skip = (page - 1) * PAGE_SIZE;
    try {
      const getallProducts = await Product.find().skip(skip).limit(PAGE_SIZE);
      console.log("getallProducts: ", getallProducts);
      res.status(200).json({ getallProducts });
    } catch (e) {
      console.log(e);
    }
  },

  async getfilterProduct(req, res) {
    const { search, brand, price } = req.body;
    let args = {};

    try {
      if (search) {
        args = { name: search };
      }
      if (brand) {
        args = { ...args, brand: brand };
      }
      if (price) {
        args = { ...args, price: { $lte: price } };
      }

      console.log("args: ", args);
      const getfilterProduct = await Product.find(args);
      console.log("getfilterProduct: ", getfilterProduct);
      res.status(200).json({ getfilterProduct });
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
