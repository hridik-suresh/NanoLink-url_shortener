import express from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import connectDB from "./src/config/db.js";
import Url from "./src/models/Url.js";

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API to create a short URL
app.post("/api/create", async (req, res) => {
  try {
    const { url } = req.body;

    // 1. Basic Validation
    if (!url) {
      return res
        .status(400)
        .json({ message: "Please provide a valid URL", success: false });
    }

    // 2. Check if the URL already exists in our database
    let existingUrl = await Url.findOne({ originalUrl: url });

    if (existingUrl) {
      return res.json({
        message: "URL already shortened",
        shortUrl: `http://localhost:${PORT}/${existingUrl.shortId}`,
        shortId: existingUrl.shortId,
        success: true,
      });
    }

    // 3. Generate a unique shortId
    const shortId = nanoid(7);

    // 4. Create and save the new URL document
    const newUrl = new Url({
      originalUrl: url,
      shortId: shortId,
    });

    await newUrl.save();

    // 5. Send back the response
    res.status(201).json({
      message: "Success!",
      shortUrl: `http://localhost:${PORT}/${shortId}`,
      shortId: shortId,
      success: true,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening: http://localhost:${PORT}`);
});
