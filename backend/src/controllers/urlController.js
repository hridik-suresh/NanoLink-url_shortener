import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { formatUrl } from "../utils/urlHelper.js";

const baseUrl =
  process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`;

// Controller to handle URL shortening-----------------------------------------------
// post /api/url/create
export const createShortUrl = async (req, res) => {
  try {
    const { url, customAlias } = req.body;
    if (!url) return res.status(400).json({ message: "Please provide a URL" });

    const formattedUrl = formatUrl(url);
    const userId = req.user ? req.user._id : null;

    // --- NEW: GUEST RESTRICTION ---
    // If they provided a custom alias but req.user is null (not logged in)
    if (customAlias && !userId) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in to create custom aliases.",
      });
    }

    // 1. If NO custom alias is provided, check for existing link
    if (!customAlias) {
      // Search for a link that matches the URL AND has NO owner (user: null)
      const existingGuestUrl = await Url.findOne({
        originalUrl: formattedUrl,
        user: null,
      });

      if (existingGuestUrl) {
        return res.json({
          shortUrl: `${baseUrl}/${existingGuestUrl.shortId}`,
          message: "Reusing existing guest link",
          success: true,
        });
      }
    }

    // 2. Determine the shortId (Custom or Random)
    let shortId = customAlias ? customAlias.trim() : nanoid(7);

    // 3. If custom, check if that alias is already taken by ANYONE
    if (customAlias) {
      const aliasExists = await Url.findOne({ shortId });
      if (aliasExists) {
        return res.status(400).json({ message: "This alias is already taken" });
      }
    }

    // 4. Create the document
    const newUrl = new Url({
      originalUrl: formattedUrl,
      shortId,
      user: userId, // Will be null for guests, and the User ID for logged-in users
    });

    await newUrl.save();

    res.status(201).json({
      success: true,
      shortUrl: `${baseUrl}/${shortId}`,
    });
  } catch (error) {
    console.log("Error creating short URL:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update custom alias for an existing URL---------------------------------------------
// @route   PATCH /api/url/:id
export const updateUrlAlias = async (req, res) => {
  try {
    const { newAlias } = req.body;
    const { id } = req.params; // The MongoDB _id of the URL entry

    if (!newAlias) {
      return res.status(400).json({ message: "Please provide a new alias" });
    }

    // 1. Validation: No spaces or special characters (Alphanumeric and dashes only)
    const aliasRegex = /^[a-zA-Z0-9-_]+$/;
    if (!newAlias || !aliasRegex.test(newAlias)) {
      return res.status(400).json({
        message: "Invalid alias. Use only letters, numbers, and dashes.",
      });
    }

    // 2. Check if the new alias is already in use by anyone
    const aliasExists = await Url.findOne({ shortId: newAlias });
    if (aliasExists) {
      return res.status(400).json({ message: "This alias is already taken" });
    }

    // 3. Find the URL and ensure it belongs to the logged-in user
    const url = await Url.findOne({ _id: id, user: req.user._id });

    if (!url) {
      return res
        .status(404)
        .json({ message: "Link not found or unauthorized" });
    }

    // 4. Update the alias
    url.shortId = newAlias;
    await url.save();

    res.json({
      success: true,
      message: "Alias updated successfully!",
      shortUrl: `${baseUrl}/${url.shortId}`,
    });
  } catch (error) {
    console.log("Error updating URL alias:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all URLs created by the logged-in user--------------------------------------
// @route   GET /api/url/my-links
export const getUserUrls = async (req, res) => {
  try {
    // req.user._id is available thanks to the 'protect' middleware
    const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });

    if (urls.length === 0) {
      return res.status(200).json({
        message: "You have not created any shortened URLs yet.",
        urls: [],
      });
    }

    res.status(200).json({
      success: true,
      count: urls.length,
      urls,
    });
  } catch (error) {
    console.error("Error fetching user URLs:", error);
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
      { shortId: shortId.trim() },
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
