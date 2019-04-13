const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const firebase = require('firebase');
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
});
const puppeteer = require('puppeteer');
const chunk = require('lodash/chunk');
const Crossword = require('./models/Crossword');
const isPerfectSquare = require('./functions/isPerfectSquare');
const puppeteerConfig = require('./parse/puppeteerConfig');
const Constants = require('./config/constants');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/parse/:src', async (req, res) => {
    const source = req.params.src;
    if (!Constants.SOURCES.includes(source)) {
        res.sendStatus(400);
    }
    const url = Constants.SOURCE_URL_MAP.get(source);
    const baseUrl = Constants.SOURCE_BASE_URL_MAP.get(source);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    var html = await page.content();
    const parseEntry = puppeteerConfig.SOURCE_PARSE_ENTRY_MAP.get(source);
    const hrefArr = await parseEntry(html);
    await page.goto(baseUrl + hrefArr[2]);
    html = await page.content();
    const clickReveal = puppeteerConfig.SOURCE_CLICK_REVEAL_MAP.get(source);
    for (let selector of clickReveal) {
        await page.click(selector);
    }
    html = await page.content();
    const parseClues = puppeteerConfig.SOURCE_PARSE_CLUES_MAP.get(source);
    const clues = {};
    clues[Constants.ACROSS] = await parseClues(html, Constants.ACROSS);
    clues[Constants.DOWN] = await parseClues(html, Constants.DOWN);
    const parseGrid = puppeteerConfig.SOURCE_PARSE_GRID_MAP.get(source);
    const gridArr = await parseGrid(html);
    if (!isPerfectSquare(gridArr.length)) {
        throw new Error('The parsed grid is not a square.');
    }
    const grid = chunk(gridArr, Math.sqrt(gridArr.length));
    const crossword = new Crossword(source, clues, grid);
    console.log(crossword.source);
    console.log(crossword.clues);
    console.log(crossword.grid);

    res.sendStatus(200);
});
