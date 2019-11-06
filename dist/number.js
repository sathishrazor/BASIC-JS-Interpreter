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
define(["require", "exports", "./error/RT_error", "./Value"], function (require, exports, RT_error_1, Value_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BNumber = /** @class */ (function (_super) {
        __extends(BNumber, _super);
        function BNumber(value) {
            var _this = _super.call(this) || this;
            _this.value = value;
            return _this;
        }
        BNumber.prototype.added_to = function (other) {
            if (other instanceof BNumber) {
                return new BNumber(this.value + other.value).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.subbed_by = function (other) {
            if (other instanceof BNumber) {
                return new BNumber(this.value - other.value).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.multed_by = function (other) {
            if (other instanceof BNumber) {
                return new BNumber(this.value * other.value).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.dived_by = function (other) {
            if (other instanceof BNumber) {
                if (other.value == 0) {
                    return new RT_error_1.RTError(other.pos_start, other.pos_end, 'Division by zero', this.context);
                }
                return new BNumber(this.value / other.value).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.powed_by = function (other) {
            if (other instanceof BNumber) {
                return new BNumber(Math.pow(this.value, other.value)).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.get_comparison_eq = function (other) {
            if (other instanceof BNumber) {
                var temp = this.value == other.value ? 1 : 0;
                return new BNumber(temp).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.get_comparison_ne = function (other) {
            if (other instanceof BNumber) {
                var temp = this.value != other.value ? 1 : 0;
                return new BNumber(temp).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.get_comparison_lt = function (other) {
            if (other instanceof BNumber) {
                var temp = this.value < other.value ? 1 : 0;
                return new BNumber(temp).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.get_comparison_gt = function (other) {
            if (other instanceof BNumber) {
                var temp = this.value > other.value ? 1 : 0;
                return new BNumber(temp).set_context(this.context);
            }
            else {
                return this.illegal_operation(other);
            }
        };
        BNumber.prototype.get_comparison_lte = function (other) {
            if (other instanceof BNumber) {
                var temp = this.value <= other.value ? 1 : 0;
                return new BNumber(temp).set_context(this.context);
            }
            else
                return this.illegal_operation(other);
        };
        BNumber.prototype.get_comparison_gte = function (other) {
            if (other instanceof BNumber) {
                var temp = this.value >= other.value ? 1 : 0;
                return new BNumber(temp).set_context(this.context);
            }
            else
                return this.illegal_operation(other);
        };
        BNumber.prototype.anded_by = function (other) {
            if (other instanceof BNumber) {
                var temp = this.value && other.value ? 1 : 0;
                return new BNumber(temp).set_context(this.context);
            }
            else
                return this.illegal_operation(other);
        };
        BNumber.prototype.ored_by = function (other) {
            if (other instanceof BNumber) {
                var temp = this.value || other.value ? 1 : 0;
                return new BNumber(temp).set_context(this.context);
            }
            else
                return this.illegal_operation(other);
        };
        BNumber.prototype.notted = function () {
            var temp = this.value == 0 ? 1 : 0;
            return new BNumber(temp).set_context(this.context);
        };
        BNumber.prototype.copy = function () {
            var copy = new BNumber(this.value);
            copy.set_pos(this.pos_start, this.pos_end);
            copy.set_context(this.context);
            return copy;
        };
        BNumber.prototype.is_true = function () {
            return this.value != 0;
        };
        BNumber.prototype.toString = function () {
            return this.value;
        };
        return BNumber;
    }(Value_1.Value));
    exports.BNumber = BNumber;
    BNumber.null = new BNumber(0);
    BNumber.false = new BNumber(0);
    BNumber.true = new BNumber(1);
    BNumber.math_PI = new BNumber(Math.PI);
});
