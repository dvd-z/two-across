const Cell = require('./Cell');
/**
 * Class representing a non-fillable cell.
 * @extends Cell
 */
module.exports = class BlackCell extends Cell {
    /**
     * Create a non-fillable cell.
     * @param {number} id - The id. 
     */
    constructor(id) {
        super(id);
    }
}
