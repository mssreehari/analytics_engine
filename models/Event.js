const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  siteId: { type: String, required: true },
  event: { type: String, default: 'pageview' },
  url: String,
  referrer: String,
  screen: String,
  userAgent: String,
  ip: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
