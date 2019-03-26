/** Abstract class representing a cell. */
module.exports = class Cell {
    /**
     * Create a cell.
     * @param {number} id - The id of the cell. One-indexed.
     */
    constructor(id) {
        if (this.constructor === Cell) {
            throw new TypeError('Abstract class "Cell" cannot be instantiated directly.');
        }
        this.id = id;
    }
}
