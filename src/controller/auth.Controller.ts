import { Request, Response } from "express";
import { User } from "../model/user";
import bcrypt from "bcryptjs";

export const registerUser = async (req : Request,res : Response) => {

  try {
    
    const { username, email, password, role } = req.body;

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

    
    res.json({ 
      message: "Login successful", 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role 
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};