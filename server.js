const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const puppeteer = require('puppeteer');
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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    const parse = parseMaps.SOURCE_PARSE_ENTRY_MAP.get(source);
    const hrefArr = await parse(html);
    console.log(hrefArr);

    res.sendStatus(200);
});
