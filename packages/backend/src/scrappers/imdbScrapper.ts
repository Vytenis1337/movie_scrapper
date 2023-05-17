import { decode, encode } from 'js-base64';
import { Browser } from 'puppeteer';

const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const { Base64 } = require('js-base64');
const axios = require('axios');

export async function scrappeImdb() {
    const globalAny: any = global;

    if (!globalAny.btoa) {
        globalAny.btoa = encode;
    }

    if (!globalAny.atob) {
        globalAny.atob = decode;
    }

    const browser: Browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.imdb.com/chart/top');
    const movies = await page.$$eval('.lister-list tr', (rows) => {
        return rows.map((row: any) => {
            const titleElement = row.querySelector('.titleColumn a');
            const rankElement = row.querySelector('.ratingColumn strong');
            const ratingElement = row.querySelector('.imdbRating strong');
            const yearElement = row.querySelector('.titleColumn span');

            const title = titleElement.textContent.trim();
            const rank = parseInt(rankElement.textContent, 10);
            const rating = parseFloat(ratingElement.textContent);
            const year = parseInt(yearElement.textContent.slice(1, -1), 10);

            // const src = page.$eval('.jw-video', (element) => element.getAttribute('src'));

            return { title, rank, rating, year };
        });
    });

    // const movieIds = await page.$$eval('.lister-list tr', (rows) => {
    //     return rows.map((row: any) => {
    //         const linkElement = row.querySelector('.titleColumn a');
    //         const movieId = linkElement.href.split('/')[4];

    //         return movieId;
    //     });
    // });

    console.log(movies);

    // Close the Puppeteer browser
    await browser.close();

    // Call the API's POST endpoint to save the movies in MongoDB
    //     try {
    //         const response = await axios.post('http://localhost:3000/movies', movies);
    //         console.log(response.data);
    //     } catch (error: any) {
    //         console.error('Error calling API:', error.message);
    //     }
}

export interface Product {
    movieId: number;
    title: string;
    rank: number;
    rating: number;
    year: string;
    genres: [string];
    posterUrl: string;
    summary: string;
    videoUrl: string;
}

async function scrapeMovieDetails(movieId: any) {
    const movieData = {} as Product;

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the movie page
    await page.goto(`https://www.imdb.com/title/${movieId}`, { waitUntil: 'networkidle2' });

    // Wait for the movie details to load
    await page.waitForSelector('.sc-afe43def-0').catch((err: any) => console.log(err));

    // Extract movie details
    movieData.movieId = movieId;
    movieData.title = await page.$eval('.sc-afe43def-0', (element: any) => element.textContent.trim());
    console.log(movieData.title);
    // movieData.rank = await page.$eval('.titleReviewBar', (element: any) =>
    //     parseInt(element.querySelector('strong').textContent.trim(), 10)
    // );
    movieData.rating = await page.$eval('.sc-bde20123-1', (element: any) => parseFloat(element.textContent));
    console.log(movieData.rating);
    // await page.waitForSelector('.ipc-link').catch((err: any) => console.log(err));
    // movieData.year = await page.$eval('.ipc-inline-list__item(:first-child) a', (element: any) =>
    //     parseInt(element.textContent, 10)
    // );
    // console.log(movieData.year);
    movieData.genres = await page.$$eval('.ipc-chip-list__scroller a', (elements: any) =>
        elements.map((element: any) => element.textContent.trim())
    );
    console.log(movieData.genres);
    movieData.posterUrl = await page.$eval('.ipc-media img', (element: any) => element.src);
    console.log(movieData.posterUrl);
    movieData.summary = await page.$eval('.sc-5f699a2-0', (element: any) => element.textContent.trim());
    console.log(movieData.summary);

    // movieData.videoUrl = await page.$eval('.jw-video video', (element: any) => element.src);
    // console.log(movieData.videoUrl);
    // Close the Puppeteer browser

    await page.hover('.sc-385ac629-8');

    await page.click('.sc-385ac629-8');

    await page.waitForSelector('.jw-media video').catch((err: any) => console.log(err));
    movieData.videoUrl = await page.$eval('.jw-media video', (element: any) => element.src);

    console.log(movieData.videoUrl);

    await page.waitForTimeout(500000);

    // movieData.videoUrl = await page.click(async () => {
    //     try {
    //         await page.click('.sc-32fc428-1');

    //         await page.waitForNavigation();
    //         // Add code here to handle the behavior after clicking the video
    //         // For example, you can extract the video URL or perform other actions
    //     } catch (error) {
    //         console.error('Error clicking on the video:', error);
    //     }
    // });

    console.log(movieData.videoUrl);
    await browser.close();

    return movieData;
}

export async function run() {
    const globalAny: any = global;

    if (!globalAny.btoa) {
        globalAny.btoa = encode;
    }

    if (!globalAny.atob) {
        globalAny.atob = decode;
    }
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
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
        const movieData = await scrapeMovieDetails(movieId);
        moviesData.push(movieData);

        // Call the API's POST endpoint to send the movie data
        try {
            const response = await axios.post('http://localhost:3000/movies', movieData);
            console.log(response.data);
        } catch (error: any) {
            console.error('Error calling API:', error.message);
        }
    }
    // console.log(movieIds);
    // Close the Puppeteer browser
}

//   run();
// sc-afe43def-0 sc-afe43def-0
