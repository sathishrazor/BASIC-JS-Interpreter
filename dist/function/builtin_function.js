var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../core/RTResult", "./base_function", "../others/number", "../error/RT_error", "../others/list"], function (require, exports, RTResult_1, base_function_1, number_1, RT_error_1, list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BuiltInFunction = /** @class */ (function (_super) {
        __extends(BuiltInFunction, _super);
        function BuiltInFunction(name) {
            return _super.call(this, name) || this;
        }
        BuiltInFunction.prototype.execute = function (args, _this) {
            if (!_this) {
                _this = this;
            }
            var res = new RTResult_1.RTResult();
            var exec_ctx = _this.generate_new_context();
            var method_name = "execute_" + _this.name;
            var method = undefined;
            switch (method_name) {
                case "no_visit_method":
                    method = _this.no_visit_method;
                    break;
                case "execute_print":
                    method = _this.execute_print;
                    break;
                case "execute_input_int":
                    method = _this.execute_input_int;
                    break;
                case "execute_print_ret":
                    method = _this.execute_print_ret;
                    break;
                case "execute_input":
                    method = _this.execute_input;
                    break;
                case "execute_input_int":
                    method = _this.execute_input_int;
                    break;
                case "execute_clear":
                    method = _this.execute_clear;
                    break;
                case "execute_is_number":
                    method = _this.execute_is_number;
                    break;
                case "execute_is_string":
                    method = _this.execute_is_string;
                    break;
                case "execute_is_list":
                    method = _this.execute_is_list;
                    break;
                case "execute_is_function":
                    method = _this.execute_is_function;
                    break;
                case "execute_append":
                    method = _this.execute_append;
                    break;
                case "execute_pop":
                    method = _this.execute_pop;
                    break;
                case "execute_extend":
                    method = _this.execute_extend;
                    break;
                case "execute_len":
                    method = _this.execute_len;
                    break;
                case "execute_run":
                    method = _this.execute_run;
                    break;
            }
            res.register(_this.check_and_populate_args(method.arg_names, args, exec_ctx));
            if (res.should_return())
                return res;
            var return_value = res.register(method(exec_ctx));
            if (res.should_return())
                return res;
            return res.success(return_value);
        };
        BuiltInFunction.prototype.no_visit_method = function (_this) {
            if (!_this) {
                _this = this;
            }
            throw new Error("No execute_" + _this.name + " method ined");
        };
        BuiltInFunction.prototype.copy = function (_this) {
            if (!_this) {
                _this = this;
            }
            var copy = new BuiltInFunction(_this.name);
            copy.set_context(_this.context);
            copy.set_pos(_this.pos_start, _this.pos_end);
            return copy;
        };
        BuiltInFunction.prototype.toString = function (_this) {
            if (!_this) {
                _this = this;
            }
            return "<built-in function " + _this.name + ">";
        };
        BuiltInFunction.prototype.execute_print = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            throw new RT_error_1.RTError(undefined, undefined, "operation not supported", exec_ctx);
        };
        BuiltInFunction.prototype.execute_print_ret = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            throw new RT_error_1.RTError(undefined, undefined, "operation not supported", exec_ctx);
        };
        BuiltInFunction.prototype.execute_input = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            throw new RT_error_1.RTError(undefined, undefined, "operation not supported", exec_ctx);
        };
        BuiltInFunction.prototype.execute_input_int = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            throw new RT_error_1.RTError(undefined, undefined, "operation not supported", exec_ctx);
        };
        BuiltInFunction.prototype.execute_clear = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            throw new RT_error_1.RTError(undefined, undefined, "operation not supported", exec_ctx);
        };
        BuiltInFunction.prototype.execute_is_number = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var is_number = exec_ctx.symbol_table.value instanceof Number;
            return new RTResult_1.RTResult().success(is_number);
        };
        BuiltInFunction.prototype.execute_is_string = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var is_number = exec_ctx.symbol_table.value instanceof String;
            return new RTResult_1.RTResult().success(is_number);
        };
        BuiltInFunction.prototype.execute_is_list = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var is_number = exec_ctx.symbol_table.value instanceof list_1.List;
            return new RTResult_1.RTResult().success(is_number);
        };
        BuiltInFunction.prototype.execute_is_function = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var is_number = exec_ctx.symbol_table.value instanceof base_function_1.BaseFunction;
            return new RTResult_1.RTResult().success(is_number);
        };
        BuiltInFunction.prototype.execute_append = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var list_ = exec_ctx.symbol_table.list;
            var value = exec_ctx.symbol_table.value;
            if (!(list_ instanceof list_1.List)) {
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, "First argument must be list", exec_ctx));
            }
            list_.elements.push(value);
            return new RTResult_1.RTResult().success(number_1.BNumber.null);
        };
        BuiltInFunction.prototype.execute_pop = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var list_ = exec_ctx.symbol_table.list;
            var index = exec_ctx.symbol_table.index;
            if (!(list_ instanceof list_1.List)) {
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, "First argument must be list", exec_ctx));
            }
            if (!(index instanceof number_1.BNumber)) {
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, "Second argument must be number", exec_ctx));
            }
            try {
                var element = list_.elements.pop(index.value);
            }
            catch (e) {
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, 'Element at _this index could not be removed from list because index is out of bounds', exec_ctx));
            }
            return new RTResult_1.RTResult().success(element);
        };
        BuiltInFunction.prototype.execute_extend = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var listA = exec_ctx.symbol_table.get("listA");
            var listB = exec_ctx.symbol_table.get("listB");
            if (!(listA instanceof list_1.List)) {
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, "First argument must be list", exec_ctx));
            }
            if (!(listB instanceof list_1.List)) {
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, "Second argument must be list", exec_ctx));
            }
            listA.elements.extend(listB.elements);
            return new RTResult_1.RTResult().success(number_1.BNumber.null);
        };
        BuiltInFunction.prototype.execute_len = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var list_ = exec_ctx.symbol_table.list;
            if (!(list_ instanceof list_1.List))
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, "Argument must be list", exec_ctx));
            return new RTResult_1.RTResult().success(new number_1.BNumber(list_.elements.length));
        };
        BuiltInFunction.prototype.execute_run = function (exec_ctx, _this) {
            if (!_this) {
                _this = this;
            }
            var _fn = exec_ctx.symbol_table.fn;
            if (!(_fn instanceof String)) {
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, "Second argument must be string", exec_ctx));
            }
            var fn = exec_ctx.symbol_table.fn;
            try {
                var script = fn;
                return new RTResult_1.RTResult().success(number_1.BNumber.null);
            }
            catch (e) {
                return new RTResult_1.RTResult().failure(new RT_error_1.RTError(_this.pos_start, _this.pos_end, "Failed to load script \"" + fn + "\"\n" + e.toString(), exec_ctx));
            }
        };
        BuiltInFunction.prototype.run = function (_this) {
            if (!_this) {
                _this = this;
            }
            throw new Error("Method not implemented.");
        };
        return BuiltInFunction;
    }(base_function_1.BaseFunction));
    exports.BuiltInFunction = BuiltInFunction;
    BuiltInFunction.print = new BuiltInFunction("print");
    BuiltInFunction.print_ret = new BuiltInFunction("print_ret");
    BuiltInFunction.input = new BuiltInFunction("input");
    BuiltInFunction.input_int = new BuiltInFunction("input_int");
    BuiltInFunction.clear = new BuiltInFunction("clear");
    BuiltInFunction.is_number = new BuiltInFunction("is_number");
    BuiltInFunction.is_string = new BuiltInFunction("is_string");
    BuiltInFunction.is_list = new BuiltInFunction("is_list");
    BuiltInFunction.is_function = new BuiltInFunction("is_function");
    BuiltInFunction.append = new BuiltInFunction("append");
    BuiltInFunction.pop = new BuiltInFunction("pop");
    BuiltInFunction.extend = new BuiltInFunction("extend");
    BuiltInFunction.len = new BuiltInFunction("len");
    BuiltInFunction.run = new BuiltInFunction("run");
});
