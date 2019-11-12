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
define(["require", "exports", "../others/Value", "./context", "../core/RTResult", "../error/RT_error", "../others/symbol_table"], function (require, exports, Value_1, context_1, RTResult_1, RT_error_1, symbol_table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseFunction = /** @class */ (function (_super) {
        __extends(BaseFunction, _super);
        function BaseFunction(name) {
            var _this = _super.call(this) || this;
            _this.name = name || "<anonymous>";
            return _this;
        }
        BaseFunction.prototype.generate_new_context = function () {
            var new_context = new context_1.Context(this.name, this.context, this.pos_start);
            new_context.symbol_table = new symbol_table_1.SymbolTable(new_context.parent.symbol_table);
            return new_context;
        };
        BaseFunction.prototype.check_args = function (arg_names, args) {
            var res = new RTResult_1.RTResult();
            if (args.length > arg_names.length) {
                throw res.failure(new RT_error_1.RTError(this.pos_start, this.pos_end, "{" + args.length + " - " + arg_names.length + " too many args passed into " + this, this.context));
            }
            if (args.length < arg_names.length) {
                throw res.failure(new RT_error_1.RTError(this.pos_start, this.pos_end, "{" + args.length + " - " + arg_names.length + " too few args passed into " + this, this.context));
            }
            return res.success(null);
        };
        BaseFunction.prototype.populate_args = function (arg_names, args, exec_ctx) {
            for (var i = 0; i < args.length; i++) {
                var arg_name = arg_names[i];
                var arg_value = args[i];
                arg_value.set_context(exec_ctx);
                exec_ctx.symbol_table.set(arg_name, arg_value);
            }
        };
        BaseFunction.prototype.check_and_populate_args = function (arg_names, args, exec_ctx) {
            var res = new RTResult_1.RTResult();
            res.register(this.check_args(arg_names, args));
            if (res.should_return())
                return res;
            this.populate_args(arg_names, args, exec_ctx);
            return res.success(null);
        };
        return BaseFunction;
    }(Value_1.Value));
    exports.BaseFunction = BaseFunction;
});
