import {CodeError} from "./code_error"
import {LPosition} from "../core/position"

export class RTError extends CodeError
{
context: any;  

constructor(pos_start:LPosition|undefined, pos_end:LPosition|undefined, details:string, context:any)
{
    super(pos_start,pos_end,'Runtime Error',details);
    this.context  =context;
};    

as_string(_this?:any)
 {
    if(!_this)
    {
       _this = this;
    }
    var result  = _this.generate_traceback();
    result += `{_this.error_name}:
     {_this.details}\n\n' + {_this.pos_start.ftxt}, {_this.pos_start}, {_this.pos_end}`;
    return result;
 }

 generate_traceback(_this?:any)
 {
    if(!_this)
    {
       _this = this;
    }
    var result = ''
    var ctx = _this.context;
    var pos = _this.pos_start;
    while (ctx)
    {
      result = `File {pos.fn}, line ${pos.ln + 1}, 
      in ${ctx.display_name}\n  ${result}`;
      pos = ctx.parent_entry_pos
      ctx = ctx.parent  
    }
    return `Traceback (most recent call last):\n'  ${result}`;
 }
 
}

