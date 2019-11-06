import {CodeError} from "./code_error"
import {LPosition} from "../position"
export class IllegalCharError extends CodeError
{
    constructor(pos_start:LPosition,pos_end:LPosition,details:string)
    {
        super(pos_start,pos_end,'Illegal Character',details);
    };
}

