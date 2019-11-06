import { Token } from "../tokens";

export class BinOpNode {
    left_node: any;
    op_tok: Token;
    right_node: any;
    pos_start: any;
    pos_end: any;
    constructor(left_node:any, op_tok:Token, right_node:any)
    {
        this.left_node = left_node
        this.op_tok = op_tok
        this.right_node = right_node
        this.pos_start = this.left_node.pos_start
        this.pos_end = this.right_node.pos_end
    }

 toString()
 {
     return `{this.left_node}, {this.op_tok}, {this.right_node}`;
 }

}
