import express from "express";
import { createShortUrl, redirectUrl, updateUrlAlias } from "../controllers/urlController.js";
import { optionalProtect, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", optionalProtect, createShortUrl); // Endpoint to create a short URL

router.patch("/url/:id", protect, updateUrlAlias);// Edit an existing URL's alias

router.get("/:shortId", redirectUrl); // Endpoint to redirect to the original URL

export default router;
