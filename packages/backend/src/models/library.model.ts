const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    movieId: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
    },
    videoUrl: {
        type: String,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Library', librarySchema);
