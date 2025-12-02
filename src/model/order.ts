import mongoose from "mongoose";


export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  customerName: string;
  userEmail: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered";
  giftWrap: boolean;
  message: string;
}

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  userEmail: { type: String, required: true },
  items: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending"
  },
  giftWrap: { type: Boolean, default: false },
  message: { type: String, default: "" },
}, { timestamps: true });

export const Order = mongoose.model<IOrder>("Order", OrderSchema);