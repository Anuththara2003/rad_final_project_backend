import mongoose from "mongoose";

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

}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: [String],
    enum: Object.values(Role),
    default: [Role.USER]
  },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);