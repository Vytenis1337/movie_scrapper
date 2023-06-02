import { decode, encode } from 'js-base64';
import { Browser } from 'puppeteer';
import { imdbSingleScrapper } from './imdbSingleScrapper';

const puppeteer = require('puppeteer');

const { Base64 } = require('js-base64');
const axios = require('axios');

// export async function scrappeImdb() {
//     const globalAny: any = global;

//     if (!globalAny.btoa) {
//         globalAny.btoa = encode;
//     }

//     if (!globalAny.atob) {
//         globalAny.atob = decode;
//     }

//     const browser: Browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.goto('https://www.imdb.com/chart/top');
//     const movies = await page.$$eval('.lister-list tr', (rows) => {
//         return rows.map((row: any) => {
//             const titleElement = row.querySelector('.titleColumn a');
//             const rankElement = row.querySelector('.ratingColumn strong');
//             const ratingElement = row.querySelector('.imdbRating strong');
//             const yearElement = row.querySelector('.titleColumn span');

//             const title = titleElement.textContent.trim();
//             const rank = parseInt(rankElement.textContent, 10);
//             const rating = parseFloat(ratingElement.textContent);
//             const year = parseInt(yearElement.textContent.slice(1, -1), 10);

// const src = page.$eval('.jw-video', (element) => element.getAttribute('src'));

//         return { title, rank, rating, year };
//     });
// });

// const movieIds = await page.$$eval('.lister-list tr', (rows) => {
//     return rows.map((row: any) => {
//         const linkElement = row.querySelector('.titleColumn a');
//         const movieId = linkElement.href.split('/')[4];

//         return movieId;
//     });
// });

// console.log(movies);

// Close the Puppeteer browser
// await browser.close();

// Call the API's POST endpoint to save the movies in MongoDB
//     try {
//         const response = await axios.post('http://localhost:3000/movies', movies);
//         console.log(response.data);
//     } catch (error: any) {
//         console.error('Error calling API:', error.message);
//     }
// }

export interface Product {
    movieId: number;
    title: string;
    rank: number;
    rating: number;
    year: number;
    genres: [string];
    posterUrl: string;
    summary: string;
    videoUrl: string;
}

export async function imdbTopListScrapper() {
    const globalAny: any = global;

    if (!globalAny.btoa) {
        globalAny.btoa = encode;
    }

    if (!globalAny.atob) {
        globalAny.atob = decode;
    }
    // Launch Puppeteer browser
    const browser: Browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to IMDb's Top 250 list
    await page.goto('https://www.imdb.com/chart/top');

    // Scrape the movie IDs
    const movieIds = await page.$$eval('.lister-list tr', (rows: any[]) => {
        return rows.map((row) => {
            const linkElement = row.querySelector('.titleColumn a');
            const movieId = linkElement.href.split('/')[4];

            return movieId;
        });
    });

    await browser.close();

    const moviesData = [];

    // Scrape movie details for each movie ID
    for (const movieId of movieIds) {
        const movieData = await imdbSingleScrapper(movieId);
        moviesData.push(movieData);

        // Call the API's POST endpoint to send the movie data
        try {
            const response = await axios.post('http://localhost:8000/api/movies', movieData);
            console.log(response.data);
        } catch (error: any) {
            console.error('Error calling API:', error.message);
        }
    }
    // console.log(movieIds);
    // Close the Puppeteer browser
}
