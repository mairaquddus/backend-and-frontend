const express = require("express");
const ProductController = require("../Controllers/ProductController");
const router = express.Router();


router.post("/", ProductController.createProduct);


router.get("/", ProductController.getProduct);


router.get("/:id", ProductController.getSingleProduct);


router.put("/:id", ProductController.updateProduct);


router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
