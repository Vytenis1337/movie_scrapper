import { NextFunction, Request, Response } from 'express';
import movieModel from '../models/movie.model';

export const createMovie = async (req: Request, res: Response) => {
    const movieData = req.body;
    console.log(movieData);

    const movie = new movieModel(movieData);

    // movieModel.exists({id: movieData.movieId})

    // Save the movie to MongoDB
    movie
        .save()
        .then(() => {
            console.log('Movie added to MongoDB');
        })
        .catch((error: any) => {
            console.error('Error adding movie to MongoDB:', error);
        });

    res.send('Movie data received');
};

export const getMovie = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    try {
        const movie = await movieModel.findById(req.params.id);

        if (!movie) res.status(404);
        res.status(200).send(movie);
    } catch (err) {
        next(err);
    }
};

export const getMovies = async (req: Request, res: Response) => {
    const q: any = req.query;
    console.log(req.query);

    const filters = {
        ...(q.genres && { genres: { $in: [q.genres] } }),

        ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
    };
    try {
        const movies = await movieModel.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(movies);
    } catch (err) {
        console.log(err);
    }
};
