define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UnaryOpNode = /** @class */ (function () {
        function UnaryOpNode(op_tok, node) {
            this.op_tok = op_tok;
            this.node = node;
            this.pos_start = this.op_tok.pos_start;
            this.pos_end = node.pos_end;
        }
        UnaryOpNode.prototype.toString = function () {
            return "{this.op_tok}, {this.node}";
        };
        return UnaryOpNode;
    }());
    exports.UnaryOpNode = UnaryOpNode;
});
