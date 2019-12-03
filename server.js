const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const firebase = require('firebase');
const db = firebase.firestore(firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}));
const puppeteer = require('puppeteer');
const _ = require('lodash');
const Crossword = require('./models/Crossword');
const isPerfectSquare = require('./functions/isPerfectSquare');
const toJson = require('./functions/toJson');
const puppeteerConfig = require('./parse/puppeteerConfig');
const Constants = require('./config/constants');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/parse/:src', async (req, res) => {
    const source = req.params.src;
    if (!Constants.SOURCES.has(source)) {
        res.sendStatus(400);
    }
    const url = Constants.SOURCE_URL_MAP.get(source);
    const baseUrl = Constants.SOURCE_BASE_URL_MAP.get(source);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    let html = await page.content();
    const parseEntry = puppeteerConfig.SOURCE_PARSE_ENTRY_MAP.get(source);
    const hrefArr = await parseEntry(html);
    await page.goto(baseUrl + hrefArr[2]);
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
    const grid = _.chunk(gridArr, Math.sqrt(gridArr.length));
    const date = hrefArr[2].substr(hrefArr[2].indexOf('daily') + 6);
    const crossword = new Crossword(source, date, clues, grid);

    const crosswordRef = db.collection('crosswords').doc(crossword.id);
    crosswordRef.set({
        source: crossword.source,
        date: crossword.date
    })
        .then(() => console.log('Crossword successfully saved.'))
        .catch(err => console.error(err));

    clues[Constants.ACROSS] = _.flatten(clues[Constants.ACROSS]);
    clues[Constants.DOWN] = _.flatten(clues[Constants.DOWN]);
    crosswordRef.collection('metadata').doc("clues").set(clues);

    res.sendStatus(200);
});
