define(["require", "exports", "./error/RT_error", "./RTResult"], function (require, exports, RT_error_1, RTResult_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Value = /** @class */ (function () {
        function Value() {
            this.set_pos();
            this.set_context();
        }
        Value.prototype.set_pos = function (pos_start, pos_end) {
            if (pos_start === void 0) { pos_start = undefined; }
            if (pos_end === void 0) { pos_end = undefined; }
            this.pos_start = pos_start;
            this.pos_end = pos_end;
            return this;
        };
        Value.prototype.set_context = function (context) {
            if (context === void 0) { context = null; }
            this.context = context;
            return this;
        };
        Value.prototype.added_to = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.subbed_by = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.multed_by = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.dived_by = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.powed_by = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.get_comparison_eq = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.get_comparison_ne = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.get_comparison_lt = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.get_comparison_gt = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.get_comparison_lte = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.get_comparison_gte = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.anded_by = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.ored_by = function (other) {
            throw this.illegal_operation(other);
        };
        Value.prototype.notted = function () {
            throw this.illegal_operation();
        };
        Value.prototype.execute = function (args) {
            throw new RTResult_1.RTResult().failure(this.illegal_operation());
        };
        Value.prototype.copy = function () {
            throw new Error('No copy method ined');
        };
        Value.prototype.is_true = function () {
            return false;
        };
        Value.prototype.illegal_operation = function (other) {
            if (other === void 0) { other = null; }
            if (!other) {
                other = this;
            }
            return new RT_error_1.RTError(this.pos_start, other.pos_end, 'Illegal operation', this.context);
        };
        return Value;
    }());
    exports.Value = Value;
});
