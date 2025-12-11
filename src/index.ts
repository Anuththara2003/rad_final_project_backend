import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes Imports
import authRoutes from './routes/auth.routes'; 
import productRoutes from './routes/products.routes';
import orderRoutes from './routes/orders.routes';
import userRoutes from './routes/users.routes';
import statsRoutes from './routes/stats.routes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stats', statsRoutes);


// DB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/giftify"; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));