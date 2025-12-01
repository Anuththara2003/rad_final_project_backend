import express from "express";
import { Product } from "../models/product"; 

const router = express.Router();

router.post("/", async (req, res): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});


router.post("/recommend", async (req, res): Promise<void> => {
  try {
    const { relationship, occasion, budget } = req.body;

    console.log("Quiz Request:", { relationship, occasion, budget });

    let minPrice = 0;
    let maxPrice = 100000; 

    if (budget === 'low') { 
        maxPrice = 50; 
    } else if (budget === 'medium') { 
        minPrice = 50; 
        maxPrice = 150; 
    } else if (budget === 'high') { 
        minPrice = 150; 
    }

   
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice }, 
      tags: { 
        $in: [
            new RegExp(`^${relationship}$`, "i"), 
            new RegExp(`^${occasion}$`, "i")
        ] 
      }
    });

    res.json(products);

  } catch (error) {
    console.error("Recommendation Error:", error);
    res.status(500).json({ message: "Error getting recommendations", error });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

export default router;