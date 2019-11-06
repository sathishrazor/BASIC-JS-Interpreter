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
        ParseResult.prototype.register_advancement = function () {
            this.last_registered_advance_count = 1;
            this.advance_count += 1;
        };
        ParseResult.prototype.register = function (res) {
            this.last_registered_advance_count = res.advance_count;
            this.advance_count += res.advance_count;
            if (res.error) {
                this.error = res.error;
            }
            return res.node;
        };
        ParseResult.prototype.try_register = function (res) {
            if (res.error) {
                this.to_reverse_count = res.advance_count;
                return null;
            }
            return this.register(res);
        };
        ParseResult.prototype.success = function (node) {
            this.node = node;
            return this;
        };
        ParseResult.prototype.failure = function (error) {
            if (!this.error || this.last_registered_advance_count == 0) {
                this.error = error;
            }
            return this;
        };
        return ParseResult;
    }());
    exports.ParseResult = ParseResult;
});
