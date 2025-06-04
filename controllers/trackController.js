const Event = require('../models/Event');

exports.trackEvent = async (req, res) => {
  try {
    const { siteId, url, referrer, screen, userAgent } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const newEvent = new Event({
      siteId,
      url,
      referrer,
      screen,
      userAgent,
      ip,
    });

    await newEvent.save();

    res.status(201).json({ message: 'Event tracked' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track event' });
  }
};
