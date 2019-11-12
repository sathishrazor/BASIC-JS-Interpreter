import { LPosition } from "../core/position"
export class WhileNode {
    condition_node: any;
    body_node: any;
    should_return_null: any;
    pos_start: LPosition | undefined;
    pos_end: LPosition | undefined;
    constructor(condition_node: any, body_node: any, should_return_null: any) {
        this.condition_node = condition_node;
        this.body_node = body_node;
        this.should_return_null = should_return_null;
        this.pos_start = this.condition_node.pos_start;
        this.pos_end = this.body_node.pos_end;
    }

}
