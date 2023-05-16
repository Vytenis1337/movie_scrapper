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

            return { title, rank, rating, year };
        });
    });

    // Close the Puppeteer browser
    await browser.close();

    // Call the API's POST endpoint to save the movies in MongoDB
    try {
        const response = await axios.post('http://localhost:3000/movies', movies);
        console.log(response.data);
    } catch (error: any) {
        console.error('Error calling API:', error.message);
    }
}
