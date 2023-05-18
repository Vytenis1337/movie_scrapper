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

    await page.hover('.sc-385ac629-8');

    await page.click('.sc-385ac629-8');

    await page.waitForTimeout(2000);

    await page.waitForSelector('.jw-media video').catch((err: any) => console.log(err));
    movieData.videoUrl = await page.$eval('.jw-media video', (element: any) => element.src);

    console.log(movieData.videoUrl);

    await page.waitForTimeout(5000000);

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
