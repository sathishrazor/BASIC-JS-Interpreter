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
define(["require", "exports", "./base_function", "./RTResult", "./interpreter", "./number"], function (require, exports, base_function_1, RTResult_1, interpreter_1, number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Function = /** @class */ (function (_super) {
        __extends(Function, _super);
        function Function(name, body_node, arg_names, should_auto_return) {
            var _this = _super.call(this, name) || this;
            _this.body_node = body_node;
            _this.arg_names = arg_names;
            _this.should_auto_return = should_auto_return;
            return _this;
        }
        Function.prototype.execute = function (args) {
            var res = new RTResult_1.RTResult();
            var interpreter = new interpreter_1.Interpreter();
            var exec_ctx = this.generate_new_context();
            res.register(this.check_and_populate_args(this.arg_names, args, exec_ctx));
            if (res.should_return())
                return res;
            var value = res.register(interpreter.visit(this.body_node, exec_ctx));
            if (res.should_return() && res.func_return_value == null)
                return res;
            var ret_value = undefined;
            if (this.should_auto_return) {
                ret_value = value;
            }
            else {
                ret_value = null;
            }
            return res.success(ret_value || res.func_return_value || number_1.BNumber.null);
        };
        Function.prototype.copy = function () {
            var copy = new Function(this.name, this.body_node, this.arg_names, this.should_auto_return);
            copy.set_context(this.context);
            copy.set_pos(this.pos_start, this.pos_end);
            return copy;
        };
        Function.prototype.toString = function () {
            return "<function " + this.name + ">";
        };
        return Function;
    }(base_function_1.BaseFunction));
    exports.Function = Function;
});
