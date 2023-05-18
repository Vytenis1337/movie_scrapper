import movieModel from './models/movie.model';
import { Request, Response } from 'express';

import { imdbTopListScrapper } from './scrappers/imdbTopListScrapper';
const express = require('express');

const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3000;

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://vyteniskondrackis:Zalgiris!1@merncluster.svzxnze.mongodb.net/?retryWrites=true&w=majority&dbname=imdb'
        );
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.log(error);
    }
};

app.post('/movies', (req: Request, res: Response) => {
    // const movies = req.body;
    // movieModel
    //     .insertMany(movies)
    //     .then(() => {
    //         res.send('Movies saved successfully');
    //     })
    //     .catch((err: any) => {
    //         console.error(err);
    //         res.status(500).send('Error saving movies to database');
    //     });
    const movieData = req.body;
    console.log(movieData); // Do something with the movie data

    // Create a new Movie instance
    const movie = new movieModel(movieData);

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
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    connect();
    return console.log(`Express is listening at http://localhost:${port}`);
});

imdbTopListScrapper();
