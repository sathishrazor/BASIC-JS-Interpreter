define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StringNode = /** @class */ (function () {
        function StringNode(tok) {
            this.tok = tok;
            this.pos_start = this.tok.pos_start;
            this.pos_end = this.tok.pos_end;
        }
        StringNode.prototype.toString = function () {
            return this.tok.toString();
        };
        return StringNode;
    }());
    exports.StringNode = StringNode;
});
