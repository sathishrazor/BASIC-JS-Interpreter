define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RTResult = /** @class */ (function () {
        function RTResult() {
            this.reset();
        }
        RTResult.prototype.reset = function () {
            this.value = null;
            this.error = null;
            this.func_return_value = null;
            this.loop_should_continue = false;
            this.loop_should_break = false;
        };
        RTResult.prototype.register = function (res) {
            this.error = res.error;
            this.func_return_value = res.func_return_value;
            this.loop_should_continue = res.loop_should_continue;
            this.loop_should_break = res.loop_should_break;
            return res.value;
        };
        RTResult.prototype.success = function (value) {
            this.reset();
            this.value = value;
            return this;
        };
        RTResult.prototype.success_return = function (value) {
            this.reset();
            this.func_return_value = value;
            return this;
        };
        RTResult.prototype.success_continue = function () {
            this.reset();
            this.loop_should_continue = true;
            return this;
        };
        RTResult.prototype.success_break = function () {
            this.reset();
            this.loop_should_break = true;
            return this;
        };
        RTResult.prototype.failure = function (error) {
            this.reset();
            this.error = error;
            return this;
        };
        RTResult.prototype.should_return = function () {
            return [
                this.error ||
                    this.func_return_value ||
                    this.loop_should_continue ||
                    this.loop_should_break
            ];
        };
        return RTResult;
    }());
    exports.RTResult = RTResult;
});
