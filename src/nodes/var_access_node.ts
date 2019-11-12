import { LPosition } from "../core/position"
import { Token } from "../others/tokens";
export class VarAccessNode {
    var_name_tok: Token;
    pos_start: LPosition | undefined;
    pos_end: LPosition | undefined;
    constructor(var_name_tok: Token) {
        this.var_name_tok = var_name_tok
        this.pos_start = this.var_name_tok.pos_start
        this.pos_end = this.var_name_tok.pos_end
    }
}