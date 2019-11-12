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
define(["require", "exports", "./code_error"], function (require, exports, code_error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RTError = /** @class */ (function (_super) {
        __extends(RTError, _super);
        function RTError(pos_start, pos_end, details, context) {
            var _this_1 = _super.call(this, pos_start, pos_end, 'Runtime Error', details) || this;
            _this_1.context = context;
            return _this_1;
        }
        ;
        RTError.prototype.as_string = function (_this) {
            if (!_this) {
                _this = this;
            }
            var result = _this.generate_traceback();
            result += "{_this.error_name}:\n     {_this.details}\n\n' + {_this.pos_start.ftxt}, {_this.pos_start}, {_this.pos_end}";
            return result;
        };
        RTError.prototype.generate_traceback = function (_this) {
            if (!_this) {
                _this = this;
            }
            var result = '';
            var ctx = _this.context;
            var pos = _this.pos_start;
            while (ctx) {
                result = "File {pos.fn}, line " + (pos.ln + 1) + ", \n      in " + ctx.display_name + "\n  " + result;
                pos = ctx.parent_entry_pos;
                ctx = ctx.parent;
            }
            return "Traceback (most recent call last):\n'  " + result;
        };
        return RTError;
    }(code_error_1.CodeError));
    exports.RTError = RTError;
});
