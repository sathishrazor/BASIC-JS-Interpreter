import { LPosition } from "../core/position"
export class ListNode {
    element_nodes: Array<any>;
    pos_start: LPosition;
    pos_end: LPosition;
    constructor(element_nodes: Array<any>, pos_start: LPosition, pos_end: LPosition) {
        this.element_nodes = element_nodes;
        this.pos_start = pos_start
        this.pos_end = pos_end
    }
}
