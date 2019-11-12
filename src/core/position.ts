export class LPosition {
    idx: any;
    ln: number;
    col: number;
    fn: string;
    ftxt: string;

    constructor(idx: any, ln: number, col: number, fn: string, ftxt: string) {
        this.idx = idx
        this.ln = ln
        this.col = col
        this.fn = fn
        this.ftxt = ftxt
    }

    advance(current_char: string = '') {
        this.idx += 1
        this.col += 1

        if (current_char == '\n') {
            this.ln += 1
            this.col = 0
        }
        return this;
    }

    copy() {
        return new LPosition(this.idx, this.ln, this.col, this.fn, this.ftxt);
    }

}
