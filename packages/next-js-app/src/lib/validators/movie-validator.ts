import { number, string, z } from 'zod';

export const movieSchema = z.object({
    _id: string(),
    movieId: string(),

    title: string(),
    posterUrl: string(),
    videoUrl: string(),
    summary: string(),
    genres: z.array(z.string()),
    rating: number(),
    year: string(),
});

export type MovieType = z.infer<typeof movieSchema>;

export const librarySchema = z.object({
    userId: string(),
    movieId: string(),
    singleMovieId: string(),
    title: string(),
    posterUrl: string(),
    videoUrl: string(),
    summary: string(),
    genres: z.array(z.string()),
    rating: number(),
    year: string(),
});

export type LibraryType = z.infer<typeof librarySchema>;
