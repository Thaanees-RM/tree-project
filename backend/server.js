import express from 'express';
import "dotenv/config";
import cors from 'cors';
import morgan from 'morgan';
import promClient from 'prom-client';

import connectDB from './configs/db.js';
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Initialize Express App
const app = express();

// 📌 Connect to MongoDB
await connectDB();

// 🛡️ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/certificates", express.static("public/certificates"));
app.use(morgan('combined')); // Logs HTTP requests

// 🧠 Prometheus metrics setup
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics(); // Collect Node.js default metrics

// Custom Counter example: API requests count
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Track all API requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
    });
  });
  next();
});

// 📈 Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api", authRoutes);

app.get('/', (req, res) => res.send("Server is Running"));

// 🔊 Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
