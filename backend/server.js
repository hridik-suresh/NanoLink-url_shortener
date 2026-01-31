import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import urlRoutes from "./src/routes/urlRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", urlRoutes); // API routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/", urlRoutes); // Redirect routes

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}: http://localhost:${PORT}`),
);
