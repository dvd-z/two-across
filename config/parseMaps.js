const Constants = require('./constants');
const nyt = require('../parse/nyt');

module.exports = {
    SOURCE_PARSE_BUTTON_MAP: new Map([
        [Constants.NYT, null]
    ]),
    SOURCE_PARSE_CLUES_MAP: new Map([
        [Constants.NYT, nyt.parseClues]
    ]),
    SOURCE_PARSE_ENTRY_MAP: new Map([
        [Constants.NYT, nyt.parseEntry]
    ])
};
