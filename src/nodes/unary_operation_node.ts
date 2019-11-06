import {LPosition} from "../position"
import { Token } from "../tokens";
export class UnaryOpNode {
    op_tok: Token;
    node: any;
    pos_start: LPosition|undefined;
    pos_end: LPosition|undefined;
    constructor(op_tok:Token, node:any) {
        this.op_tok = op_tok
        this.node = node
        this.pos_start = this.op_tok.pos_start
        this.pos_end = node.pos_end
    }   
    toString() {
        return `{this.op_tok}, {this.node}`;
    }
}
