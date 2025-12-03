import mongoose, { Document } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: Role[];
  wishlist: mongoose.Types.ObjectId[]; 
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  role: {
    type: [String],
    enum: Object.values(Role),
    default: [Role.USER],
  }, 

 
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]

}, { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);