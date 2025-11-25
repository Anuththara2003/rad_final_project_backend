import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number
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

export const Order = mongoose.model("Order", OrderSchema);