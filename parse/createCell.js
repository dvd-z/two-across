const BlackCell = require('../models/BlackCell');
const WhiteCell = require('../models/WhiteCell');
const $ = require('cheerio');
const Constants = require('../config/constants');

module.exports = function createCell(i, el) {
    if (el.children.length === 1) {
        return new BlackCell(i);
    } else {
        const answer = el.children
            .filter(child =>
                child.name === Constants.TEXT
            ).find(child =>
                $(child).attr(Constants.TEXT_ANCHOR).toLocaleLowerCase().includes(Constants.MIDDLE)
            );
        const label = el.children
            .filter(child =>
                child.name === Constants.TEXT
            ).find(child =>
                $(child).attr(Constants.TEXT_ANCHOR).toLocaleLowerCase().includes(Constants.START)
            );
        if (!label) {
            return new WhiteCell(i, $(answer).text());
        } else {
            return new WhiteCell(i, $(answer).text(), $(label).text());
        }
    }
}
