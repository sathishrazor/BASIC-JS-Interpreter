import { LPosition } from "../core/position"
import { Token } from "../others/tokens";
export class ForNode {
    var_name_tok: Token;
    start_value_node: any;
    end_value_node: any;
    step_value_node: any;
    body_node: any;
    should_return_null: any;
    pos_start: LPosition | undefined;
    pos_end: LPosition | undefined;

    constructor(var_name_tok: Token,
        start_value_node: any,
        end_value_node: any,
        step_value_node: any, body_node: any, should_return_null: any) {
        this.var_name_tok = var_name_tok
        this.start_value_node = start_value_node
        this.end_value_node = end_value_node
        this.step_value_node = step_value_node
        this.body_node = body_node
        this.should_return_null = should_return_null
        this.pos_start = this.var_name_tok.pos_start
        this.pos_end = this.body_node.pos_end
    }
}
