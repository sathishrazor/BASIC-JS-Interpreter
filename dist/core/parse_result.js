define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ParseResult = /** @class */ (function () {
        function ParseResult() {
            this.error = null;
            this.node = null;
            this.last_registered_advance_count = 0;
            this.advance_count = 0;
            this.to_reverse_count = 0;
        }
        ParseResult.prototype.register_advancement = function (_this) {
            if (!_this) {
                _this = this;
            }
            _this.last_registered_advance_count = 1;
            _this.advance_count += 1;
        };
        ParseResult.prototype.register = function (res, _this) {
            if (!_this) {
                _this = this;
            }
            _this.last_registered_advance_count = res.advance_count;
            _this.advance_count += res.advance_count;
            if (res.error) {
                _this.error = res.error;
            }
            return res.node;
        };
        ParseResult.prototype.try_register = function (res, _this) {
            if (!_this) {
                _this = this;
            }
            if (res.error) {
                _this.to_reverse_count = res.advance_count;
                return null;
            }
            return _this.register(res);
        };
        ParseResult.prototype.success = function (node, _this) {
            if (!_this) {
                _this = this;
            }
            _this.node = node;
            return _this;
        };
        ParseResult.prototype.failure = function (error, _this) {
            if (!_this) {
                _this = this;
            }
            if (!_this.error || _this.last_registered_advance_count == 0) {
                _this.error = error;
            }
            return _this;
        };
        return ParseResult;
    }());
    exports.ParseResult = ParseResult;
});
