import {LPosition} from "../position"
export class CallNode
{
    node_to_call: any;
    arg_nodes: any[];
    pos_start: LPosition|undefined;
    pos_end: LPosition|undefined;
    constructor( node_to_call:any, arg_nodes:Array<any>)
    {
        this.node_to_call = node_to_call
        this.arg_nodes = arg_nodes
    
        this.pos_start = this.node_to_call.pos_start
    
        if(this.arg_nodes.length > 0)
        {
            this.pos_end = this.arg_nodes[this.arg_nodes.length - 1].pos_end
        }
        else
        {
            this.pos_end = this.node_to_call.pos_end
        }
        
    }
   
}
