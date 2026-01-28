import express from "express";
import { createShortUrl, redirectUrl } from "../controllers/urlController.js";

const router = express.Router();

router.post("/create", createShortUrl); // Endpoint to create a short URL

router.get("/:shortId", redirectUrl); // Endpoint to redirect to the original URL

export default router;
