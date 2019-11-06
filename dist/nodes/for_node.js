define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ForNode = /** @class */ (function () {
        function ForNode(var_name_tok, start_value_node, end_value_node, step_value_node, body_node, should_return_null) {
            this.var_name_tok = var_name_tok;
            this.start_value_node = start_value_node;
            this.end_value_node = end_value_node;
            this.step_value_node = step_value_node;
            this.body_node = body_node;
            this.should_return_null = should_return_null;
            this.pos_start = this.var_name_tok.pos_start;
            this.pos_end = this.body_node.pos_end;
        }
        return ForNode;
    }());
    exports.ForNode = ForNode;
});
