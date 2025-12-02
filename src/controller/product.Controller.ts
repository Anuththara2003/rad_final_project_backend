import { Request, Response } from "express";
import { Product } from "../model/product";

export const addProduct = async (req :Request, res :Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};


export const getProducts = async (req :Request, res :Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};



export const getRecommendations = async (req :Request, res :Response) => {
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
};



export const updateProduct = async (req :Request, res :Response) => {
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
};


export const deleteProduct = async (req :Request, res :Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};