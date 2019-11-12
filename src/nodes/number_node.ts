import {LPosition} from "../core/position"
import { Token } from "../others/tokens";
export class  NumberNode
{
    tok: Token;
    pos_start: LPosition|undefined;
    pos_end: LPosition|undefined;

    constructor(tok:Token)
    {   
        this.tok = tok;
        this.pos_start = this.tok.pos_start
        this.pos_end = this.tok.pos_end
    }
    toString()
    {
        return this.tok.toString();
    }
}

