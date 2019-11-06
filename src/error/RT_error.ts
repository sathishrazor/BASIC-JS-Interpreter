import {CodeError} from "./code_error"
import {LPosition} from "../position"

export class RTError extends CodeError
{
context: any;  

constructor(pos_start:LPosition|undefined, pos_end:LPosition|undefined, details:string, context:any)
{
    super(pos_start,pos_end,'Runtime Error',details);
    this.context  =context;
};    

as_string()
 {
    var result  = this.generate_traceback();
    result += `{this.error_name}:
     {this.details}\n\n' + {this.pos_start.ftxt}, {this.pos_start}, {this.pos_end}`;
    return result;
 }

 generate_traceback()
 {
    var result = ''
    var ctx = this.context;
    var pos = this.pos_start;
    while (ctx)
    {
      result = `File {pos.fn}, line {str(pos.ln + 1)}, 
      in {ctx.display_name}\n  {result}`;
      pos = ctx.parent_entry_pos
      ctx = ctx.parent  
    }
    return `Traceback (most recent call last):\n'  {result}`;
 }
 
}

