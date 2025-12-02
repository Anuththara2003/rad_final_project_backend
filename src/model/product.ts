import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Electronics, Toys, etc.
  price: { type: Number, required: true },
  tags: [{ type: String }], // ["Teen", "Birthday", "Male"] වගේ tags
  image: { type: String, required: true }, // Image Link එක
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export const Product = mongoose.model("Product", ProductSchema);