const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    // Existing fields...

    downloadAllowed: { type: Boolean, required: true },
    commercialRightsVerified: { type: Boolean, required: true },
    aiGenerated: { type: Boolean, required: true },
    rightsSource: { type: String, enum: ['suno_paid', 'suno_free', 'other'], required: true },
    subscriptionStatus: { type: String, enum: ['active', 'inactive', 'pending'], required: true },
    rightsExpiryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);