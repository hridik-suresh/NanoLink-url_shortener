import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { formatUrl } from "../utils/urlHelper.js";

const PORT = process.env.PORT || 8080;

// Controller to handle URL shortening-----------------------------------------------
// post /api/create
export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    // 1. Basic Validation
    if (!url) {
      return res
        .status(400)
        .json({ message: "Please provide a valid URL", success: false });
    }

    // Clean and Format the URL
    const formattedUrl = formatUrl(url);

    // 2. Check if the URL already exists in our database
    let existingUrl = await Url.findOne({ originalUrl: formattedUrl });

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
      originalUrl: formattedUrl,
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
};

// Controller to handle redirection---------------------------------------------------
// get /:shortId
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    // 1. Find the URL and increment the click count in one operation
    const urlEntry = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 } },
    );

    if (urlEntry) {
      // 2. Redirect to the original long URL
      return res.redirect(urlEntry.originalUrl);
    }

    // Friendly 404 if the shortId doesn't exist
    return res.status(404).send(`
      <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
        <h1>404: Link not found</h1>
        <p>This shortened link does not exist in our database.</p>
      </div>
    `);
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).send("Server Error...");
  }
};
