import { nanoid } from "nanoid";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import Url from "../models/Url.js";
import Analytics from "../models/Analytics.js";
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

    // 1. Fetch the URL first and verify ownership
    const url = await Url.findOne({ _id: id, user: req.user._id });

    if (!url) {
      return res
        .status(404)
        .json({ message: "Link not found or unauthorized" });
    }

    // 2. Handle Alias Update logic
    if (newAlias && newAlias !== url.shortId) {
      // Validation
      const aliasRegex = /^[a-zA-Z0-9-_]+$/;
      if (!aliasRegex.test(newAlias)) {
        return res.status(400).json({ message: "Invalid alias format." });
      }

      // Check if someone else is using it
      const aliasExists = await Url.findOne({ shortId: newAlias });
      if (aliasExists) {
        return res.status(400).json({ message: "This alias is already taken" });
      }

      url.shortId = newAlias;
    }
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

// @desc    Delete a URL and its analytics------------------------------------------------
// @route   DELETE /api/url/:id
export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // 1. Find the URL first to make sure it belongs to the user
    const url = await Url.findOne({ _id: id, user: userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found or unauthorized" });
    }

    // 2. Delete the URL and all associated analytics
    // Use Promise.all to run both deletions at the same time for speed
    await Promise.all([
      Url.findByIdAndDelete(id),
      Analytics.deleteMany({ urlId: id }),
    ]);

    res.status(200).json({
      success: true,
      message: "URL and all associated analytics deleted successfully",
    });
  } catch (error) {
    console.error("Delete URL Error:", error);
    res.status(500).json({ message: "Server Error deleting URL" });
  }
};

// @desc Controller to handle redirection---------------------------------------------------
// @route get /:shortId
export const redirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId.trim();

    // 1. COMBINED OPERATION: Find the URL and increment the click count in one go
    const urlEntry = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 } },
      { new: true },
    );

    if (!urlEntry) {
      return res.status(404).json({ message: "Link not found" });
    }

    if (urlEntry.user) {
      // 2. Initialize the parser with the request headers
      const parser = new UAParser(req.headers["user-agent"]);
      const result = parser.getResult();

      // 3. Extract clean data
      const browserName = result.browser.name || "Unknown";
      const osName = `${result.os.name || "Unknown"} ${result.os.version || ""}`;
      const deviceType = result.device.type || "Desktop";

      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;
      const geo = geoip.lookup(ip); // This will give us country and city info based on the IP address

      // 4. Save analytics (Background task)
      Analytics.create({
        urlId: urlEntry._id,
        browser: browserName,
        os: osName,
        device: deviceType.charAt(0).toUpperCase() + deviceType.slice(1), // Capitalize
        referrer: req.headers["referer"] || "Direct",
        ipAddress: ip, // Storing the raw IP to process location later
        country: geo?.country || "Unknown",
        city: geo?.city || "Unknown",
      }).catch((err) => console.error("Analytics Error:", err));
    }

    return res.redirect(urlEntry.originalUrl);
  } catch (error) {
    console.error("Redirect Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
