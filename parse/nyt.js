const $ = require('cheerio');
const zip = require('lodash/zip');
const createCell = require('./createCell');
const Constants = require('../config/constants');

async function parseEntry(html) {
    return $(`a[href*=${Constants.NYT_LINK_SUBSTR} i]`, html)
        .map((i, el) =>
            el.attribs.href
        ).toArray();
}

async function parseClues(html, direction) {
    return $('h3', html)
        .filter((i, el) =>
            $(el).text().toLocaleLowerCase().includes(direction)
        ).map((i, el) =>
            el.next
        ).map((i, el) => {
            const labels = $(`span[class *= '${Constants.LABEL}' i]`, el)
                .toArray()
                .map(el =>
                    $(el).text()
                );
            const text = $(`span[class *= '${Constants.TEXT}' i]`, el)
                .toArray()
                .map(el =>
                    $(el).text()
                );
            return zip(labels, text);
        }).toArray();
}

async function parseGrid(html) {
    return $('g', html)
        .filter((i, el) =>
            !Object.keys(el.attribs).length
        ).map((i, el) =>
            createCell(i, el.children)
        ).toArray();
}

module.exports = {
    parseClues: parseClues,
    parseGrid: parseGrid,
    parseEntry: parseEntry
};
