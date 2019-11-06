import {LPosition} from "../position"
export class CodeError
{
    pos_start: LPosition|undefined;
    pos_end: LPosition|undefined;
    error_name: string|undefined;
    details: string|undefined;    
    constructor( pos_start:LPosition|undefined,
         pos_end:LPosition|undefined, 
         error_name:string, details:string)
    {
        this.pos_start = pos_start
        this.pos_end = pos_end
        this.error_name = error_name
        this.details = details
    }
    
    as_string()
    {
       return  `{this.error_name}: {this.details}\n
        File {this.pos_start.fn}, line {this.pos_start.ln + 1}
       '\n\n' {this.pos_start.ftxt}::{this.pos_start}::{this.pos_end}`;     
    }
}


