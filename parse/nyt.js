const $ = require('cheerio');
const zip = require('lodash/zip');
const Constants = require('../config/constants');

async function parseEntry(html) {
    return $('a', html)
        .filter((i, el) =>
            $(el).attr('href')
        ).filter((i, el) =>
            $(el).attr('href').includes(Constants.NYT_LINK_SUBSTR)
        ).map((i, el) =>
            el.attribs.href
        ).toArray();
}

async function parseClues(html, direction) {
    return $('h3', html)
        .filter((i, el) =>
            $(el).text().toLocaleLowerCase().includes(direction)
        ).map((i, el) =>
            $(el)['0'].next
        ).map((i, el) => {
            const labels = $(`span[class*='label']`, el)
                .toArray()
                .map(el =>
                    $(el).text()
                );
            const text = $(`span[class*='text']`, el)
                .toArray()
                .map(el =>
                    $(el).text()
                );
            return zip(labels, text);
        }).toArray();
}

module.exports = {
    parseClues: parseClues,
    parseEntry: parseEntry
};
