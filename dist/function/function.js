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
define(["require", "exports", "./base_function", "../core/RTResult", "../interpreter", "../others/number"], function (require, exports, base_function_1, RTResult_1, interpreter_1, number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Function = /** @class */ (function (_super) {
        __extends(Function, _super);
        function Function(name, body_node, arg_names, should_auto_return) {
            var _this_1 = _super.call(this, name) || this;
            _this_1.body_node = body_node;
            _this_1.arg_names = arg_names;
            _this_1.should_auto_return = should_auto_return;
            return _this_1;
        }
        Function.prototype.execute = function (args, _this) {
            if (!_this) {
                _this = this;
            }
            var res = new RTResult_1.RTResult();
            var interpreter = new interpreter_1.Interpreter();
            var exec_ctx = _this.generate_new_context();
            res.register(_this.check_and_populate_args(_this.arg_names, args, exec_ctx));
            if (res.should_return())
                return res;
            var value = res.register(interpreter.visit(_this.body_node, exec_ctx));
            if (res.should_return() && res.func_return_value == null)
                return res;
            var ret_value = undefined;
            if (_this.should_auto_return) {
                ret_value = value;
            }
            else {
                ret_value = null;
            }
            return res.success(ret_value || res.func_return_value || number_1.BNumber.null);
        };
        Function.prototype.copy = function (_this) {
            if (!_this) {
                _this = this;
            }
            var copy = new Function(_this.name, _this.body_node, _this.arg_names, _this.should_auto_return);
            copy.set_context(_this.context);
            copy.set_pos(_this.pos_start, _this.pos_end);
            return copy;
        };
        Function.prototype.toString = function (_this) {
            if (!_this) {
                _this = this;
            }
            return "<function " + _this.name + ">";
        };
        return Function;
    }(base_function_1.BaseFunction));
    exports.Function = Function;
});
