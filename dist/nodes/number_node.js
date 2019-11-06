define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumberNode = /** @class */ (function () {
        function NumberNode(tok) {
            this.tok = tok;
            this.pos_start = this.tok.pos_start;
            this.pos_end = this.tok.pos_end;
        }
        NumberNode.prototype.toString = function () {
            return this.tok.toString();
        };
        return NumberNode;
    }());
    exports.NumberNode = NumberNode;
});
