import express from "express";
import { Product } from "../models/product";

const router = express.Router();

// 1. අලුත් Product එකක් දාන්න (Create)
router.post("/", async (req, res): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

// 2. ඔක්කොම Products ගන්න (Read)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});


//update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // අලුත් දත්ත ආපහු එවන්න
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});


// 3. Product එකක් delete කරන්න
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

export default router;