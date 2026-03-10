const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track', required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  totalListens: { type: Number, default: 0 },
  listensByDay: [{ date: { type: Date }, count: { type: Number, default: 0 } }],
  listensByWeek: [{ weekStart: { type: Date }, count: { type: Number, default: 0 } }],
  listensByMonth: [{ monthStart: { type: Date }, count: { type: Number, default: 0 } }],
  totalRatings: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);