import { Request, Response } from "express";
import { Product } from "../model/product";
import { User } from "../model/user";
import { Order } from "../model/order";

export const getStats = async (req :Request, res: Response) => {
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
};