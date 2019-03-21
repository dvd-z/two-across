const Constants = require('./constants');
const nyt = require('../parse/nyt');

module.exports = {
    SOURCE_PARSE_ENTRY_MAP: new Map([
        [Constants.NYT, nyt.parseEntry]
    ]),
    SOURCE_PARSE_ACROSS_MAP: new Map([
        [Constants.NYT, nyt.parseAcross]
    ])
};
