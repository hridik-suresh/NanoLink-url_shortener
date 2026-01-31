import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./src/config/db.js";
import urlRoutes from "./src/routes/urlRoutes.js";
import { redirectUrl } from "./src/controllers/urlController.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

const PORT = process.env.PORT || 8080;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

//  Auth Routes
app.use("/api/auth", authRoutes);
//  URL Management Routes
app.use("/api/url", urlRoutes);
//  The Redirect Route
app.get("/:shortId", redirectUrl);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}: http://localhost:${PORT}`),
);
