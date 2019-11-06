import {LPosition} from "../position"
import { Token } from "../tokens";
export class FuncDefNode
{
    var_name_tok: any;
    arg_name_toks: any;
    body_node: any;
    should_auto_return: any;
    pos_start: LPosition|undefined;
    pos_end: LPosition|undefined;
    constructor(var_name_tok:Token, arg_name_toks:Array<Token>, body_node:any, should_auto_return:boolean)
    {
        this.var_name_tok = var_name_tok
        this.arg_name_toks = arg_name_toks
        this.body_node = body_node
        this.should_auto_return = should_auto_return

        if (this.var_name_tok)
        {
            this.pos_start = this.var_name_tok.pos_start        
        }
        else if (this.arg_name_toks.length > 0)
        {
            this.pos_start = this.arg_name_toks[0].pos_start
        }
        else 
        {
            this.pos_start = this.body_node.pos_start
        }
        this.pos_end = this.body_node.pos_end
    }
}

   