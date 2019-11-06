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
define(["require", "exports", "./Value", "./number"], function (require, exports, Value_1, number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BString = /** @class */ (function (_super) {
        __extends(BString, _super);
        function BString(value) {
            var _this = _super.call(this) || this;
            _this.value = value;
            return _this;
        }
        BString.prototype.added_to = function (other) {
            if (other instanceof BString) {
                return new BString(this.value + other.value).set_context(this.context);
            }
            else {
                throw this.illegal_operation(other);
            }
        };
        BString.prototype.multed_by = function (other) {
            if (other instanceof number_1.BNumber) {
                return new BString(this.value * other.value).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BString.prototype.is_true = function () {
            return this.value.length > 0;
        };
        BString.prototype.copy = function () {
            var copy = new BString(this.value);
            copy.set_pos(this.pos_start, this.pos_end);
            copy.set_context(this.context);
            return copy;
        };
        BString.prototype.toBString = function () {
            return "\"{this.value}\"";
        };
        return BString;
    }(Value_1.Value));
    exports.BString = BString;
});
