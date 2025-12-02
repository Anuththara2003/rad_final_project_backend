import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  role: { 
    type: String, 
    enum: ["USER", "ADMIN"], 
    default: "USER" 
  },
});

export const User = mongoose.model("User", UserSchema);