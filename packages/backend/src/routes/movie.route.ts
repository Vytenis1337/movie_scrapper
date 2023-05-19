import express from 'express';
import { createMovie, getMovie, getMovies } from '../controllers/movie.controller';

const router = express.Router();

router.post('/movies', createMovie);

router.get('/movies/single/:id', getMovie);
router.get('/movies', getMovies);

export default router;
