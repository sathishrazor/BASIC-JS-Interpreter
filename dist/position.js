define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LPosition = /** @class */ (function () {
        function LPosition(idx, ln, col, fn, ftxt) {
            this.idx = idx;
            this.ln = ln;
            this.col = col;
            this.fn = fn;
            this.ftxt = ftxt;
        }
        LPosition.prototype.advance = function (current_char) {
            if (current_char === void 0) { current_char = ''; }
            this.idx += 1;
            this.col += 1;
            if (current_char == '\n') {
                this.ln += 1;
                this.col = 0;
            }
            return this;
        };
        LPosition.prototype.copy = function () {
            return new LPosition(this.idx, this.ln, this.col, this.fn, this.ftxt);
        };
        return LPosition;
    }());
    exports.LPosition = LPosition;
});
