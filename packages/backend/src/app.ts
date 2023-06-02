import movieModel from './models/movie.model';
import { Request, Response } from 'express';

import { imdbTopListScrapper } from './scrappers/imdbTopListScrapper';
import movieRoute from './routes/movie.route';
import libraryRoute from './routes/library.route';
import { testScrapper } from './scrappers/testScrappe';
import bodyParser from 'body-parser';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
const port = 8000;

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

app.use('/api', movieRoute);
app.use('/api', libraryRoute);

// app.post('/movies', (req: Request, res: Response) => {

//     const movieData = req.body;
//     console.log(movieData);

//     const movie = new movieModel(movieData);

// movieModel.exists({id: movieData.movieId})

// Save the movie to MongoDB
//     movie
//         .save()
//         .then(() => {
//             console.log('Movie added to MongoDB');
//         })
//         .catch((error: any) => {
//             console.error('Error adding movie to MongoDB:', error);
//         });

//     res.send('Movie data received');
// });

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    connect();
    return console.log(`Express is listening at http://localhost:${port}`);
});

// imdbTopListScrapper();

// testScrapper('tt0056058');
