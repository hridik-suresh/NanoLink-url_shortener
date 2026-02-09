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
        },
        links: userUrls, // Only the 10 links for this specific page
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error fetching analytics" });
  }
};
