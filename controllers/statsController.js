const Event = require('../models/Event');

exports.getStats = async (req, res) => {
  const { siteId } = req.query;

  if (!siteId) return res.status(400).json({ error: "siteId is required" });

  try {
    const totalViews = await Event.countDocuments({ siteId });

    const viewsPerDay = await Event.aggregate([
      { $match: { siteId } },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day"
            }
          },
          count: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    const topUrls = await Event.aggregate([
      { $match: { siteId } },
      {
        $group: {
          _id: "$url",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const referrers = await Event.aggregate([
      { $match: { siteId } },
      {
        $group: {
          _id: "$referrer",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalViews,
      viewsPerDay,
      topUrls,
      referrers
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
