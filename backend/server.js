
import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

// Initialize Express App
const app = express();

// Connect to MongoDB
await connectDB()

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api", authRoutes);

app.get('/', (req, res) => res.send("Server is Running"))

const  PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));



