class Cell {
    constructor(id) {
        if (this.constructor === Cell) {
            throw new TypeError('Abstract class "Cell" cannot be instantiated directly.');
        }
        this.id = id;
    }
}