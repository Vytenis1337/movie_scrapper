const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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
    // rank: {
    //     type: Number,
    //     required: true,
    // },
    rating: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Movie', movieSchema);
