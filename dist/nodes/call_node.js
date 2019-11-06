define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CallNode = /** @class */ (function () {
        function CallNode(node_to_call, arg_nodes) {
            this.node_to_call = node_to_call;
            this.arg_nodes = arg_nodes;
            this.pos_start = this.node_to_call.pos_start;
            if (this.arg_nodes.length > 0) {
                this.pos_end = this.arg_nodes[this.arg_nodes.length - 1].pos_end;
            }
            else {
                this.pos_end = this.node_to_call.pos_end;
            }
        }
        return CallNode;
    }());
    exports.CallNode = CallNode;
});
