define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WhileNode = /** @class */ (function () {
        function WhileNode(condition_node, body_node, should_return_null) {
            this.condition_node = condition_node;
            this.body_node = body_node;
            this.should_return_null = should_return_null;
            this.pos_start = this.condition_node.pos_start;
            this.pos_end = this.body_node.pos_end;
        }
        return WhileNode;
    }());
    exports.WhileNode = WhileNode;
});
