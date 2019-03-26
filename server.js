const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const puppeteer = require('puppeteer');
const chunk = require('lodash/chunk');
const isPerfectSquare = require('./functions/isPerfectSquare');
const parseMaps = require('./config/parseMaps');
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
    const parseEntry = parseMaps.SOURCE_PARSE_ENTRY_MAP.get(source);
    const hrefArr = await parseEntry(html);
    await page.goto(baseUrl + hrefArr[2]);
    html = await page.content();
    const clickReveal = parseMaps.SOURCE_CLICK_REVEAL_MAP.get(source);
    for (let selector of clickReveal) {
        await page.click(selector);
    }
    html = await page.content();
    const parseClues = parseMaps.SOURCE_PARSE_CLUES_MAP.get(source);
    const clues = {};
    clues[Constants.ACROSS] = await parseClues(html, Constants.ACROSS);
    clues[Constants.DOWN] = await parseClues(html, Constants.DOWN);
    console.log(clues);
    const parseGrid = parseMaps.SOURCE_PARSE_GRID_MAP.get(source);
    const gridArr = await parseGrid(html);
    if (!isPerfectSquare(gridArr.length)) {
        throw new Error('The parsed grid is not a square.');
    }
    const grid = chunk(gridArr, Math.sqrt(gridArr.length));
    console.log(grid);

    res.sendStatus(200);
});
