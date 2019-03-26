const BlackCell = require('../models/BlackCell');
const WhiteCell = require('../models/WhiteCell');
const $ = require('cheerio');
const Constants = require('../config/constants');

module.exports = function createCell(i, children) {
    if (children.length === 1) {
        return new BlackCell(i);
    } else {
        const textNodes = children
            .filter(child =>
                child.name === Constants.TEXT
            );
        const answer = textNodes
            .find(node =>
                $(node).attr(Constants.TEXT_ANCHOR).toLocaleLowerCase().includes(Constants.MIDDLE)
            );
        const label = textNodes
            .find(node =>
                $(node).attr(Constants.TEXT_ANCHOR).toLocaleLowerCase().includes(Constants.START)
            );
        if (!label) {
            return new WhiteCell(i, $(answer).text());
        } else {
            return new WhiteCell(i, $(answer).text(), $(label).text());
        }
    }
}
