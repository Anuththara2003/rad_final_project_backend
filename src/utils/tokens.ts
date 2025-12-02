import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { IUser } from "../model/user";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signAccessToken = (user: IUser) => {

    return jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "30m"
        }
    )
}