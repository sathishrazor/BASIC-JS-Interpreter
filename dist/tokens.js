define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Token = /** @class */ (function () {
        function Token(type, value, pos_start, pos_end) {
            this.type = type;
            this.value = value;
            if (pos_start) {
                this.pos_start = pos_start.copy();
                this.pos_end = pos_start.copy();
                this.pos_end.advance();
            }
            if (pos_end) {
                this.pos_end = pos_end.copy();
            }
        }
        Token.prototype.matches = function (type, value) {
            return this.type == type && this.value == value;
        };
        Token.prototype.toString = function () {
            if (this.value) {
                return "{this.type}:{this.value}";
            }
            return "{this.type}";
        };
        return Token;
    }());
    exports.Token = Token;
});
