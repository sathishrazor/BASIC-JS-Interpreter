import {LPosition} from "../core/position"
export class BreakNode
{
  pos_start: LPosition;
  pos_end: LPosition;    
  constructor (pos_start:LPosition, pos_end:LPosition)
  {
    this.pos_start = pos_start
    this.pos_end = pos_end
  }
}
