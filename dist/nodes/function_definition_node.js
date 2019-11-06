define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FuncDefNode = /** @class */ (function () {
        function FuncDefNode(var_name_tok, arg_name_toks, body_node, should_auto_return) {
            this.var_name_tok = var_name_tok;
            this.arg_name_toks = arg_name_toks;
            this.body_node = body_node;
            this.should_auto_return = should_auto_return;
            if (this.var_name_tok) {
                this.pos_start = this.var_name_tok.pos_start;
            }
            else if (this.arg_name_toks.length > 0) {
                this.pos_start = this.arg_name_toks[0].pos_start;
            }
            else {
                this.pos_start = this.body_node.pos_start;
            }
            this.pos_end = this.body_node.pos_end;
        }
        return FuncDefNode;
    }());
    exports.FuncDefNode = FuncDefNode;
});
