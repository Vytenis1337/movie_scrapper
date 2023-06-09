import mongoose from 'mongoose';

const { Schema } = mongoose;

const MovieSchema = new Schema({
    movieId: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
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

const modelName = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);

export default modelName;
