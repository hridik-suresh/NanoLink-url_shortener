import express from "express";
import {
  createShortUrl,
  updateUrlAlias,
  getUserUrls,
} from "../controllers/urlController.js";
import { protect, optionalProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create - works for guests or logged-in users
// POST /api/url/create
router.post("/create", optionalProtect, createShortUrl);

// Fetch User Links - strictly for logged-in users
// GET /api/url/my-links
router.get("/my-links", protect, getUserUrls);

// Update Alias - strictly for the link owner
// PATCH /api/url/:id
router.patch("/:id", protect, updateUrlAlias);

export default router;
