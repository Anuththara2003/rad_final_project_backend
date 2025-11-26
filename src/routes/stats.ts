import express from "express";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Order } from "../models/order";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
   
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: "USER" }); 
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    res.json({
      totalProducts,
      totalUsers,
      pendingOrders,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

export default router;