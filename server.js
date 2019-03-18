const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const puppeteer = require('puppeteer');
const Constants = require('./config/constants');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/parse/:src', async (req, res) => {
    if (!Constants.SOURCES.has(req.params.src)) {
        res.sendStatus(400);
    }
    const url = Constants.SOURCES.get(req.params.src);

    puppeteer
        .launch()
        .then(browser => browser.newPage())
        .then(async page => {
            await page.goto(url);
            return await page.content();
        })
        .then()
        .catch(err => console.error(err));

    res.sendStatus(200);
});
