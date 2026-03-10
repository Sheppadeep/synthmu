const express = require('express');
const router = express.Router();

// Sample data for demonstration purposes
let tracks = [
    // Sample track objects should be defined here
];

// Get all tracks
router.get('/tracks', (req, res) => {
    res.json(tracks);
});

// Filter tracks by genre
router.get('/tracks/genre/:genre', (req, res) => {
    const genre = req.params.genre;
    const filteredTracks = tracks.filter(track => track.genre === genre);
    res.json(filteredTracks);
});

// Filter tracks by artist
router.get('/tracks/artist/:artist', (req, res) => {
    const artist = req.params.artist;
    const filteredTracks = tracks.filter(track => track.artist === artist);
    res.json(filteredTracks);
});

// Download track with rights checking
router.get('/tracks/download/:id', (req, res) => {
    const trackId = req.params.id;
    // Check user rights logic here
    // For demo, assume rights are valid
    const track = tracks.find(t => t.id === trackId);
    if (track) {
        res.download(track.filePath);
    } else {
        res.status(404).send('Track not found');
    }
});

// Stream track and increment listen count
router.get('/tracks/stream/:id', (req, res) => {
    const trackId = req.params.id;
    const track = tracks.find(t => t.id === trackId);
    if (track) {
        track.listenCount = (track.listenCount || 0) + 1; // Increment listen count
        // Stream logic should be here
        res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
        // Assume streaming logic here
    } else {
        res.status(404).send('Track not found');
    }
});

// Rate a track
router.post('/tracks/rate/:id', (req, res) => {
    const trackId = req.params.id;
    const rating = req.body.rating; // Assuming rating is sent in the body
    const track = tracks.find(t => t.id === trackId);
    if (track) {
        track.ratings = track.ratings || [];
        track.ratings.push(rating);
        res.status(200).send('Track rated successfully');
    } else {
        res.status(404).send('Track not found');
    }
});

module.exports = router;