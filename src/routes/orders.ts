import express from "express";
import { Order } from "../models/order";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); 
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
});

router.post("/", async (req, res): Promise<void> => {
    try {
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error creating order" });
    }
});

export default router;