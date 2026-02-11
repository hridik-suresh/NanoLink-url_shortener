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

// @desc    Get detailed analytics for a single URL-----------------------------------------------
// @route   GET /api/analytics/url/:urlId
export const getSingleUrlAnalytics = async (req, res) => {
  try {
    const { urlId } = req.params;
    const userId = req.user._id;

    // 1. Verify the URL exists and belongs to the user
    const url = await Url.findOne({ _id: urlId, user: userId });
    if (!url) {
      return res.status(404).json({ message: "URL not found or unauthorized" });
    }

    // 2. Fetch last 5 clicks for the "Recent Activity" table
    const recentClicks = await Analytics.find({ urlId })
      .sort({ createdAt: -1 })
      .limit(5);

    // 3. Aggregate Clicks by Date (Last 7 Days) for a Chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const clickHistory = await Analytics.aggregate([
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
      { $sort: { _id: 1 } }, // Sort by date ascending
    ]);

    // 4. Structure the Response
    res.status(200).json({
      success: true,
      data: {
        urlDetails: url,
        recentClicks,
        clickHistory, // Array of { _id: "2024-05-20", clicks: 5 }
      },
    });
  } catch (error) {
    console.error("Single URL Analytics Error:", error);
    res.status(500).json({ message: "Server Error fetching URL stats" });
  }
};
