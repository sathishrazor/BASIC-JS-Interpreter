import { Value } from "../others/Value";
import { Context } from "./context"
import { RTResult } from "../core/RTResult";
import { RTError } from "../error/RT_error";
import { SymbolTable } from "../others/symbol_table";
export class BaseFunction extends Value {
    name: any;
    constructor(name: any) {
        super();
        this.name = name || "<anonymous>"
    }
    generate_new_context() {
        var new_context = new Context(this.name, this.context, this.pos_start)
        new_context.symbol_table = new SymbolTable(new_context.parent.symbol_table)
        return new_context
    }

    check_args(arg_names: string[], args: any[]) {
        var res = new RTResult()
        if (args.length > arg_names.length) {
            throw res.failure(new RTError(
                this.pos_start, this.pos_end,
                `{${args.length} - ${arg_names.length} too many args passed into ${this}`,
                this.context
            ));
        }
        if (args.length < arg_names.length) {
            throw res.failure(new RTError(
                this.pos_start, this.pos_end,
                `{${args.length} - ${arg_names.length} too few args passed into ${this}`,
                this.context
            ))
        }
        return res.success(null)
    }

    populate_args(arg_names: string[], args: any[], exec_ctx: Context) {
        for (var i = 0; i < args.length; i++) {
            var arg_name = arg_names[i]
            var arg_value = args[i]
            arg_value.set_context(exec_ctx)
            exec_ctx.symbol_table.set(arg_name, arg_value)
        }
    }

    check_and_populate_args(arg_names: string[], args: any[], exec_ctx: Context) {
        var res = new RTResult();
        res.register(this.check_args(arg_names, args))
        if (res.should_return()) return res;
        this.populate_args(arg_names, args, exec_ctx)
        return res.success(null)
    }
}



