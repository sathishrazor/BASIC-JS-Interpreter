define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VarAccessNode = /** @class */ (function () {
        function VarAccessNode(var_name_tok) {
            this.var_name_tok = var_name_tok;
            this.pos_start = this.var_name_tok.pos_start;
            this.pos_end = this.var_name_tok.pos_end;
        }
        return VarAccessNode;
    }());
    exports.VarAccessNode = VarAccessNode;
});
