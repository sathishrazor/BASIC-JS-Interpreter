import { LPosition } from "./position";

export class Token
{
    type: any;
    value: any;    
    pos_start: LPosition | undefined;
    pos_end: LPosition | undefined;
    constructor(type:string, value:any, pos_start?:LPosition, pos_end?:LPosition)
    {
        this.type = type;
        this.value = value;
        if(pos_start)
        {
            this.pos_start = pos_start.copy()
            this.pos_end = pos_start.copy()
            this.pos_end.advance()
        }

        if(pos_end)
        {
            this.pos_end = pos_end.copy();
        }
    }

    matches(type:string, value:any)
    {
      return  this.type == type && this.value == value;
    }

    toString()
    {

        if(this.value)
        {
            return `{this.type}:{this.value}`;

        }    
           return `{this.type}`;
    }
}

