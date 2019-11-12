import {CodeError} from "./code_error"
import {LPosition} from "../core/position"

export class InvalidSyntaxError extends CodeError
{
    constructor(pos_start:LPosition,pos_end:LPosition,details:any)
    {
        super(pos_start,pos_end,'Invalid Syntax',details);
    };
}

