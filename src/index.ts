import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth'; // අලුතින් හැදූ route එක import කරන්න

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Frontend එක call කරන්නේ මෙතනට

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/giftify"; // Local DB URL එක (නැත්නම් Atlas URL එක දාන්න)

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));