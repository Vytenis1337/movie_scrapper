import { decode, encode } from 'js-base64';
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

export async function testScrapper(movieId: any) {
    const globalAny: any = global;

    if (!globalAny.btoa) {
        globalAny.btoa = encode;
    }

    if (!globalAny.atob) {
        globalAny.atob = decode;
    }

    const movieData = {} as Product;

    // Launch Puppeteer browser
    const browser: Browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    });

    // Create a new page
    const page = await browser.newPage();

    await page.goto(`https://www.imdb.com/title/tt0056058`, { waitUntil: 'networkidle2' });

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

    movieData.summary = await page.$eval('.sc-2eb29e65-3', (element: any) => element.textContent.trim());

    movieData.videoUrl = await page.evaluate(async (page) => {
        const videoLink: any = document.querySelector('.sc-385ac629-8');

        if (videoLink) {
            try {
                await videoLink.hover();

                await videoLink.click();

                await page.waitForTimeout(1000);

                await page.waitForSelector('.jw-media video').catch((err: any) => console.log(err));
                return await page.$eval('.jw-media video', (element: any) => element.src);
            } catch (error) {
                console.log(error);
            }
        }
        return '';
    }, page);

    await browser.close();

    console.log(movieData);

    return movieData;
}
