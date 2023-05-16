const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Movie', movieSchema);
