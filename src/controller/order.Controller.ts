import { Request, Response } from "express";
import { Order } from "../model/order";



export const createOrder = async (req: Request, res: Response) => {
    try {
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error creating order" });
    }
};


export const getUserOrders = async (req : Request, res:Response) => {
  try {
    const userOrders = await Order.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
};



export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); 
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};



export const updateOrderStatus = async (req: Request, res: Response) => {
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
};


export const getUserOrdersbyEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json({data:orders});
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
