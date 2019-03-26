const BlackCell = require('../models/BlackCell');
const WhiteCell = require('../models/WhiteCell');
const $ = require('cheerio');

module.exports = function createCell(i, el) {
    if (el.children.length === 1) {
        return new BlackCell(i);
    } else {
        const answer = el.children
            .filter(child =>
                child.name === 'text'
            ).find(child =>
                $(child).attr('text-anchor').toLocaleLowerCase().includes('middle')
            );
        const label = el.children
            .filter(child =>
                child.name === 'text'
            ).find(child =>
                $(child).attr('text-anchor').toLocaleLowerCase().includes('start')
            );
        if (!label) {
            return new WhiteCell(i, $(answer).text());
        } else {
            return new WhiteCell(i, $(answer).text(), $(label).text());
        }
    }
}
