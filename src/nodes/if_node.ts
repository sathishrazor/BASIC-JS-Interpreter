export class IfNode
{
    cases: any;
    else_case: any;
    pos_start: any;
    pos_end: any;
    constructor(cases:any, else_case:any)
    {
        this.cases = cases
        this.else_case = else_case    
        this.pos_start = this.cases[0][0].pos_start
        this.pos_end = (this.else_case || this.cases[this.cases.length - 1])[0].pos_end;    
    }
}
