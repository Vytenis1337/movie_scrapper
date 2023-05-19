import { Browser } from 'puppeteer';

const puppeteer = require('puppeteer');
const { Base64 } = require('js-base64');

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

export async function imdbSingleScrapper(movieId: any) {
    const movieData = {} as Product;

    // Launch Puppeteer browser
    const browser: Browser = await puppeteer.launch({
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

    // movieData.rank = await page.$eval('.titleReviewBar', (element: any) =>
    //     parseInt(element.querySelector('strong').textContent.trim(), 10)
    // );
    movieData.rating = await page.$eval('.sc-bde20123-1', (element: any) => parseFloat(element.textContent));

    movieData.year = await page.$eval('.sc-52d569c6-0 a', (element: any) => parseInt(element.textContent, 10));

    movieData.genres = await page.$$eval('.ipc-chip-list__scroller a', (elements: any) =>
        elements.map((element: any) => element.textContent.trim())
    );

    movieData.posterUrl = await page.$eval('.ipc-media img', (element: any) => element.src);

    movieData.summary = await page.$eval('.sc-5f699a2-0', (element: any) => element.textContent.trim());

    await page.hover('.sc-385ac629-8');

    await page.click('.sc-385ac629-8');

    await page.waitForTimeout(1000);

    await page.waitForSelector('.jw-media video').catch((err: any) => console.log(err));
    movieData.videoUrl = await page.$eval('.jw-media video', (element: any) => element.src);

    await browser.close();

    return movieData;
}
