const Constants = require('../config/constants');
const nyt = require('./nyt');

module.exports = {
    SOURCE_CLICK_REVEAL_MAP: new Map([
        [Constants.NYT, [
            "div.buttons-modalButtonContainer--35RTh > button",
            "div.Toolbar-expandedMenu--2s4M4 > li:nth-child(2) > button",
            "div.Toolbar-expandedMenu--2s4M4 > li:nth-child(2) > ul > li:nth-child(3)",
            "div.buttons-modalButtonContainer--35RTh > button:nth-child(2)"
        ]]
    ]),
    SOURCE_PARSE_BUTTON_MAP: new Map([
        [Constants.NYT, null]
    ]),
    SOURCE_PARSE_CLUES_MAP: new Map([
        [Constants.NYT, nyt.parseClues]
    ]),
    SOURCE_PARSE_DATE_MAP: new Map([
        [Constants.NYT, null]
    ]),
    SOURCE_PARSE_ENTRY_MAP: new Map([
        [Constants.NYT, nyt.parseEntry]
    ]),
    SOURCE_PARSE_GRID_MAP: new Map([
        [Constants.NYT, nyt.parseGrid]
    ])
};
