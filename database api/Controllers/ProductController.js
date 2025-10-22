const ProductModel = require("../Model/ProductSchema");

const ProductController = {


  createProduct: async (req, res) => {
    console.log(req.body);
    try {
      const product = await ProductModel.create(req.body);
      res.json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      res.json({
        message: "Failed to create product",
        error: error.message,
      });
    }
  },

 
  getProduct: async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      res.json({
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  },


  getSingleProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({
        message: "Product fetched successfully",
        product,
      });
    } catch (error) {
      res.json({
        message: "Failed to fetch product",
        error: error.message,
      });
    }
  },

 
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: "No product found" });
      }
      res.json({
        message: "Product updated successfully",
        updatedProduct,
      });
    } catch (error) {
      res.json({
        message: "Server error while updating product",
        error: error.message,
      });
    }
  },


  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "No product found" });
      }
      res.json({
        message: "Product deleted successfully",
        deletedProduct,
      });
    } catch (error) {
      res.json({
        message: "Server error while deleting product",
        error: error.message,
      });
    }
  }
};

module.exports = ProductController;
