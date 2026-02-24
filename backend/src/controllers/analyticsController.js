import mongoose from "mongoose";
import Url from "../models/Url.js";
import Analytics from "../models/Analytics.js";

// @desc    Get user dashboard stats---------------------------------------------
// @route   GET /api/analytics/dashboard
export const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // --- 1. Pagination Setup ---
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 links per page
    const skip = (page - 1) * limit;

    // --- 2. Fetch Paginated Links & Total Count ---
    const [userUrls, totalLinks] = await Promise.all([
      Url.find({ user: userId })
        .select("-__v")
        .sort({ createdAt: -1 }) // Show newest links first
        .skip(skip)
        .limit(limit),
      Url.countDocuments({ user: userId }),
    ]);

    // --- 3. Aggregate Analytics ---
    const allUserUrlIds = await Url.find({ user: userId }).distinct("_id");

    const stats = await Analytics.aggregate([
      { $match: { urlId: { $in: allUserUrlIds } } },
      {
        $facet: {
          deviceBreakdown: [{ $group: { _id: "$device", count: { $sum: 1 } } }],
          browserBreakdown: [
            { $group: { _id: "$browser", count: { $sum: 1 } } },
          ],
          countryBreakdown: [
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }, // Top 5 countries
          ],
          cityBreakdown: [
            { $group: { _id: "$city", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
          ],
          totalClicks: [{ $count: "count" }],
        },
      },
    ]);

    const topPerforming = await Url.findOne({ user: userId })
      .sort({ clicks: -1 })
      .limit(1);

    // --- 4. Structure the Response ---
    res.status(200).json({
      success: true,
      data: {
        totalLinks, // Total number of links in database
        currentPage: page,
        totalPages: Math.ceil(totalLinks / limit),
        totalClicks: stats[0].totalClicks[0]?.count || 0,
        topLink: topPerforming,
        breakdowns: {
          devices: stats[0].deviceBreakdown,
          browsers: stats[0].browserBreakdown,
          countries: stats[0].countryBreakdown,
          cities: stats[0].cityBreakdown,
        },
        links: userUrls, // Only the 10 links for this specific page
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error fetching analytics" });
  }
};

// @desc    Get detailed analytics for a single URL with paginated click history
// @route   GET /api/analytics/url/:urlId
export const getSingleUrlAnalytics = async (req, res) => {
  try {
    const { urlId } = req.params;
    const userId = req.user._id;

    // 1. Pagination Params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(urlId)) {
      return res.status(400).json({ message: "Invalid URL ID format" });
    }

    // 2. Verify URL Ownership
    const url = await Url.findOne({ _id: urlId, user: userId });
    if (!url) {
      return res.status(404).json({ message: "URL not found or unauthorized" });
    }

    // 3. Get Total Count for Pagination metadata
    const totalClicks = await Analytics.countDocuments({ urlId });

    // 4. Fetch Paginated Analytics
    const allClicks = await Analytics.find({ urlId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 5. Aggregate Clicks for Chart (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const chartHistory = await Analytics.aggregate([
      {
        $match: {
          urlId: new mongoose.Types.ObjectId(urlId),
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          clicks: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 6. Response with Metadata
    res.status(200).json({
      success: true,
      data: {
        urlDetails: url,
        clickHistory: chartHistory, // For the chart
        analytics: allClicks, // Paginated list for the table
        pagination: {
          totalClicks,
          currentPage: page,
          totalPages: Math.ceil(totalClicks / limit),
          hasNextPage: skip + allClicks.length < totalClicks,
        },
      },
    });
  } catch (error) {
    console.error("Single URL Analytics Error:", error);
    res.status(500).json({ message: "Server Error fetching URL stats" });
  }
};
