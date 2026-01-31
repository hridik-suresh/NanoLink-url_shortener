import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { formatUrl } from "../utils/urlHelper.js";

const PORT = process.env.PORT || 8080;
const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

// Controller to handle URL shortening-----------------------------------------------
// post /api/create
export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "Please provide a URL" });
    }

    const formattedUrl = formatUrl(url);
    // Check if THIS specific user already shortened this URL
    // (Guests check for links where user is null)
    const userId = req.user ? req.user._id : null;
    let existingUrl = await Url.findOne({
      originalUrl: formattedUrl,
      user: userId,
    });

    if (existingUrl) {
      return res.json({
        shortUrl: `${baseUrl}/${existingUrl.shortId}`,
        message: "URL already in your list",
        success: true,
      });
    }

    const shortId = nanoid(7);
    const newUrl = new Url({
      originalUrl: formattedUrl,
      shortId: shortId,
      user: userId, // Will be the ID or null
    });

    await newUrl.save();

    res.status(201).json({
      message: "Success!",
      shortUrl: `${baseUrl}/${shortId}`,
      success: true,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ message: "Server Error" });
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
      { new: true }, // Return the updated document
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
