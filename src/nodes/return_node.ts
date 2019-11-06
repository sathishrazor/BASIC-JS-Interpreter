import {LPosition} from "../position"
export class ReturnNode
{
    node_to_return: any;
    pos_start: LPosition;
    pos_end: LPosition;
    constructor( node_to_return:any, pos_start:LPosition, pos_end:LPosition)
    {
        this.node_to_return = node_to_return
        this.pos_start = pos_start
        this.pos_end = pos_end
    }
}