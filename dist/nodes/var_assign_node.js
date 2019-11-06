define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VarAssignNode = /** @class */ (function () {
        function VarAssignNode(var_name_tok, value_node) {
            this.var_name_tok = var_name_tok;
            this.value_node = value_node;
            this.pos_start = this.var_name_tok.pos_start;
            this.pos_end = this.value_node.pos_end;
        }
        return VarAssignNode;
    }());
    exports.VarAssignNode = VarAssignNode;
});
