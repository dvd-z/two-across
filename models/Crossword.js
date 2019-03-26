const Cell = require('./Cell');
const Constants = require('../config/constants');

/**
 * Class representing a Crossword.
 */
module.exports = class Crossword {
    // TODO: add date, author, editor, name properties
    /**
     * Create a crossword.
     * @param {string} source - The source of the crossword (e.g. NYT).
     * @param {Object.<string, [][]>} clues
     * @param {Cell[][]} grid - The representation of the grid. 
     */
    constructor(source, clues, grid) {
        if (!Constants.SOURCES.includes(source)) {
            throw new TypeError('"source" must be a valid source.');
        }
        this.source = source;
        this.clues = clues;
        this.grid = grid;
    }
}
