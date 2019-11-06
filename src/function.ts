import { BaseFunction } from "./base_function";
import { RTResult } from "./RTResult";
import { Interpreter } from "./interpreter";
import { BNumber } from "./number";

export class Function extends BaseFunction
{
    body_node: any;
    arg_names: string[];
    should_auto_return: boolean;

    constructor( name:string, body_node:any, arg_names:string[], should_auto_return:boolean){
        super(name);
        this.body_node = body_node
        this.arg_names = arg_names
        this.should_auto_return = should_auto_return
    }
  
   execute(args:any[])
   {
    var res = new RTResult()
    var interpreter = new  Interpreter()
    var  exec_ctx = this.generate_new_context()
    
    res.register(this.check_and_populate_args(this.arg_names, args, exec_ctx))
    if (res.should_return()) return res
    var value = res.register(interpreter.visit(this.body_node, exec_ctx))
    if (res.should_return()&& res.func_return_value == null) return res;
    var ret_value = undefined;
    if(this.should_auto_return)
    {
        ret_value = value;
    }else{
        ret_value = null;
    }
    return res.success(ret_value||res.func_return_value|| BNumber.null)
}
 copy()
 {
    var copy = new Function(this.name, this.body_node, this.arg_names, this.should_auto_return)
    copy.set_context(this.context)
    copy.set_pos(this.pos_start, this.pos_end)
    return copy
 }

 toString()
 {
    return `<function ${this.name}>`;
 }

}

