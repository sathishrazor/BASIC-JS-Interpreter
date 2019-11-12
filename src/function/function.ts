import { BaseFunction } from "./base_function";
import { RTResult } from "../core/RTResult";
import { Interpreter } from "../interpreter";
import { BNumber } from "../others/number";

export class Function extends BaseFunction {
    body_node: any;
    arg_names: string[];
    should_auto_return: boolean;

    constructor(name: string, body_node: any, arg_names: string[], should_auto_return: boolean) {
        super(name);
        this.body_node = body_node
        this.arg_names = arg_names
        this.should_auto_return = should_auto_return
    }

    execute(args: any[], _this?: this) {
        if (!_this) {
            _this = this
        }
        var res = new RTResult()
        var interpreter = new Interpreter()
        var exec_ctx = _this.generate_new_context()

        res.register(_this.check_and_populate_args(_this.arg_names, args, exec_ctx))
        if (res.should_return()) return res
        var value = res.register(interpreter.visit(_this.body_node, exec_ctx))
        if (res.should_return() && res.func_return_value == null) return res;
        var ret_value = undefined;
        if (_this.should_auto_return) {
            ret_value = value;
        } else {
            ret_value = null;
        }
        return res.success(ret_value || res.func_return_value || BNumber.null)
    }
    copy(_this?: this) {
        if (!_this) {
            _this = this
        }
        var copy = new Function(_this.name, _this.body_node, _this.arg_names, _this.should_auto_return)
        copy.set_context(_this.context)
        copy.set_pos(_this.pos_start, _this.pos_end)
        return copy
    }

    toString(_this?: this) {
        if (!_this) {
            _this = this
        }
        return `<function ${_this.name}>`;
    }

}

