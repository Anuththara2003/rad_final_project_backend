import mongoose from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  tags: string[];
  image: string;
  stock: number;
}


const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  tags: [{ type: String }],
  image: { type: String, required: true },
  stock: { type: Number, default: 0 },
}, { timestamps: true });


export const Product = mongoose.model<IProduct>("Product", ProductSchema);