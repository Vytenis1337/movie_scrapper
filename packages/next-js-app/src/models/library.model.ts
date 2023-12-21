import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

const LibrarySchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    singleMovieId: {
        type: String,
        required: true,
    },
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

const modelName = mongoose.models.Library || mongoose.model('Library', LibrarySchema);

export interface ILibrarySchema extends Document {
    summary: string;
    title: string;
    movieId: string;
    posterUrl: string;
    videoUrl: string;
    genres: string[];
    rating: number;
    year: string;
    userId: string;
    singleMovieId: string;
}

export default modelName;
