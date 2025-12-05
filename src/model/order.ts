import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  userEmail: { type: String, required: true },
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number,
      image: String,
      giftWrap: { type: Boolean, default: false },
      message: { type: String, default: "" }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export const Order = mongoose.model("Order", OrderSchema);