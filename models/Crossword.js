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
     * @param {Date} date - The date of the crossword in an interpretable format
     * @param {Object.<string, [][]>} clues
     * @param {Cell[][]} grid - The representation of the grid. 
     */
    constructor(source, date, clues, grid) {
        if (!Constants.SOURCES.has(source)) {
            throw new TypeError('"source" must be a valid source.');
        }
        this.source = source;
        this.date = new Date(date);
        this.clues = clues;
        this.grid = grid;
        this.id = this.generateId(this.source, this.date);
    }

    generateId(source, date) {
        return `${source}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
}
