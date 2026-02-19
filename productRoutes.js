const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct } = require("../controllers/productController");

// GET all products
router.get("/", getAllProducts);

// ADD product (for now, no admin auth)
router.post("/", addProduct);

module.exports = router;
