import { LPosition } from "../core/position"
import { Token } from "../others/tokens";
export class VarAssignNode {
    var_name_tok: Token;
    value_node: any;
    pos_start: LPosition | undefined;
    pos_end: any;

    constructor(var_name_tok: Token, value_node: any) {
        this.var_name_tok = var_name_tok;
        this.value_node = value_node;
        this.pos_start = this.var_name_tok.pos_start
        this.pos_end = this.value_node.pos_end
    }
}