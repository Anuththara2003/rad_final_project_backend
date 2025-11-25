import express from "express";
import { User } from "../models/user";

const router = express.Router();

// 1. ඔක්කොම Users ලා ගන්න (Password එක අයින් කරලා)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Password එක එවන්න එපා
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// 2. User කෙනෙක් Delete කරන්න
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;