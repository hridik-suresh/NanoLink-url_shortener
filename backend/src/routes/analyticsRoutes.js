import express from "express";
import { getUserDashboardStats } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/analytics/dashboard
router.get("/dashboard", protect, getUserDashboardStats);

export default router;
