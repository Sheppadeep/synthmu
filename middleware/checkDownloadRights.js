module.exports = function checkDownloadRights(req, res, next) {
    const track = req.track; // Assumes track is attached to the request

    // Check if track properties are defined
    if (!track) {
        return res.status(400).json({ message: 'Track information is required.' });
    }

    const { downloadAllowed, commercialRightsVerified, subscriptionStatus, rightsExpiryDate } = track;
    const currentDate = new Date('2026-03-10T03:46:05Z'); // Replace with Date.now() for live environment

    // Check download rights
    if (!downloadAllowed) {
        return res.status(403).json({ message: 'Download is not allowed for this track.' });
    }

    if (!commercialRightsVerified) {
        return res.status(403).json({ message: 'Commercial rights are not verified for this track.' });
    }

    if (subscriptionStatus !== 'active') {
        return res.status(403).json({ message: 'Subscription is not active.' });
    }

    if (new Date(rightsExpiryDate) < currentDate) {
        return res.status(403).json({ message: 'Rights have expired for this track.' });
    }

    // If all checks pass, proceed to the next middleware
    next();
};
