import { Request, Response } from "express";
import { Role, User } from "../model/user";
import bcrypt from "bcryptjs";
import { sign } from "crypto";
import { signAccessToken, signRefreshToken } from "../utils/tokens";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

export const registerUser = async (req : Request,res : Response) => {

  try {
    
    const { username, email, password } = req.body;

    const role = Role.USER;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "USER", 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export const loginUser = async (req : Request,res : Response) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }


    const isMatch = await bcrypt.compare(password, user.password);

    

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }


        const accessToken  = signAccessToken(user);
        const refreshToken = signRefreshToken(user);
    
    res.json({ 
      message: "Login successful", 
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role ,
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.body

        if (!token) {
            return res.status(400).json({ message: "Invalid or expired token" })
        }

        const payload = Jwt.verify(token, JWT_REFRESH_SECRET )
        const user = await User.findById(payload.sub)

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token" })
        }

        const accessToken = signAccessToken(user)
        res.status(200).json({ accessToken })


    } catch (error) {
        res.status(500).json({ message: "Invalid or expired token" })
    }
}


