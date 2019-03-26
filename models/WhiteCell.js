const Cell = require('./Cell');
/**
 * Class representing a fillable cell.
 * @extends Cell
 */
module.exports = class WhiteCell extends Cell {
    /**
     * Create a fillable cell.
     * @param {number} id - The id.
     * @param {string} answer - The character answer of the cell.
     * @param {number} label - The label of the cell, if it exists.
     */
    constructor(id, answer, label = null) {
        super(id);
        this.answer = answer;
        this.label = label;
    }

    /**
     * Determines if the cell has a label.
     * @return {boolean} - True if cell has label. False otherwise.
     */
    hasLabel() {
        return this.label !== null;
    }
}
