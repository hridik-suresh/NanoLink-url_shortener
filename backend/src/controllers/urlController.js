import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { formatUrl } from "../utils/urlHelper.js";

const baseUrl =
  process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`;

// Controller to handle URL shortening-----------------------------------------------
// post /api/create
export const createShortUrl = async (req, res) => {
  try {
    const { url, customAlias } = req.body; // Add customAlias here
    if (!url) return res.status(400).json({ message: "Please provide a URL" });

    const formattedUrl = formatUrl(url);
    const userId = req.user ? req.user._id : null;

    // 1. If NO custom alias is provided, check for existing link to avoid duplicates
    if (!customAlias) {
      const existingUrl = await Url.findOne({
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

    const newUrl = new Url({
      originalUrl: formattedUrl,
      shortId,
      user: userId,
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
