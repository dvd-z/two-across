class WhiteCell extends Cell {
    constructor(id, answer, label = null) {
        super(id);
        this.answer = answer;
        this.label = label;
    }

    hasLabel() {
        return this.label !== null;
    }
}
