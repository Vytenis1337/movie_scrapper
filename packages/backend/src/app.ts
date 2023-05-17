import movieModel from './models/movie.model';
import { Request, Response } from 'express';
import { decode, encode } from 'js-base64';
import { run, scrappeImdb } from './scrappers/imdbScrapper';
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

// scrappeImdb();

// async function run() {
//     const globalAny: any = global;

//     if (!globalAny.btoa) {
//         globalAny.btoa = encode;
//     }

//     if (!globalAny.atob) {
//         globalAny.atob = decode;
//     }
//     // Launch Puppeteer browser
//     const browser = await puppeteer.launch({ headless: false });

//     // Create a new page
//     const page = await browser.newPage();

//     // Navigate to IMDb's Top 250 list
//     await page.goto('https://www.imdb.com/chart/top');

//     // Scrape the trailer links
//     const trailerLinks = await page.$$eval('.lister-list tr', (rows: any) => {
//         return rows.map((row: any) => {
//             const linkElement = row.querySelector('.titleColumn a');
//             const trailerUrl = linkElement.href + 'videogallery';

//             return trailerUrl;
//         });
//     });

//     // Close the Puppeteer browser
//     await browser.close();

//     console.log(trailerLinks);
// }

// run();
run();
