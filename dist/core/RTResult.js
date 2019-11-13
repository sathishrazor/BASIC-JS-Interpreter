define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RTResult = /** @class */ (function () {
        function RTResult() {
            this.reset();
        }
        RTResult.prototype.reset = function (_this) {
            if (!_this) {
                _this = this;
            }
            _this.value = null;
            _this.error = null;
            _this.func_return_value = null;
            _this.loop_should_continue = false;
            _this.loop_should_break = false;
        };
        RTResult.prototype.register = function (res, _this) {
            if (!_this) {
                _this = this;
            }
            _this.error = res.error;
            _this.func_return_value = res.func_return_value;
            _this.loop_should_continue = res.loop_should_continue;
            _this.loop_should_break = res.loop_should_break;
            return res.value;
        };
        RTResult.prototype.success = function (value, _this) {
            if (!_this) {
                _this = this;
            }
            _this.reset();
            _this.value = value;
            return _this;
        };
        RTResult.prototype.success_return = function (value, _this) {
            if (!_this) {
                _this = this;
            }
            _this.reset();
            _this.func_return_value = value;
            _this.value = value;
            return _this;
        };
        RTResult.prototype.success_continue = function (_this) {
            if (!_this) {
                _this = this;
            }
            _this.reset();
            _this.loop_should_continue = true;
            return _this;
        };
        RTResult.prototype.success_break = function (_this) {
            if (!_this) {
                _this = this;
            }
            _this.reset();
            _this.loop_should_break = true;
            return _this;
        };
        RTResult.prototype.failure = function (error, _this) {
            if (!_this) {
                _this = this;
            }
            _this.reset();
            _this.error = error;
            return _this;
        };
        RTResult.prototype.should_return = function () {
            if (this.func_return_value) {
                return true;
            }
            if (this.loop_should_continue) {
                return true;
            }
            if (this.loop_should_break) {
                return true;
            }
            if (this.error) {
                return true;
            }
            return false;
        };
        return RTResult;
    }());
    exports.RTResult = RTResult;
});
