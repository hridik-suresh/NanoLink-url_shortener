import express from "express";
import {
  getUserDashboardStats,
  getSingleUrlAnalytics,
} from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/analytics/dashboard
router.get("/dashboard", protect, getUserDashboardStats);

// GET /api/analytics/url/:id
router.get("/url/:urlId", protect, getSingleUrlAnalytics);

export default router;
