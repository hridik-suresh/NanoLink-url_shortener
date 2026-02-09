import Url from "../models/Url.js";
import Analytics from "../models/Analytics.js";

export const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Get all URLs owned by this user
    const userUrls = await Url.find({ user: userId }).select("-__v");
    const urlIds = userUrls.map((url) => url._id);

    // 2. Aggregate Analytics for these URLs
    const stats = await Analytics.aggregate([
      { $match: { urlId: { $in: urlIds } } },
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

    // 3. Find the top performing link (highest clicks from the Url model)
    const topPerforming = await Url.findOne({ user: userId })
      .sort({ clicks: -1 })
      .limit(1);

    // 4. Structure the REST Response
    res.status(200).json({
      success: true,
      data: {
        totalLinks: userUrls.length,
        totalClicks: stats[0].totalClicks[0]?.count || 0,
        topLink: topPerforming,
        breakdowns: {
          devices: stats[0].deviceBreakdown,
          browsers: stats[0].browserBreakdown,
        },
        links: userUrls, // The list of all links for the table
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error fetching analytics" });
  }
};
