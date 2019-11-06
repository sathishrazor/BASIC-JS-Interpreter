define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ListNode = /** @class */ (function () {
        function ListNode(element_nodes, pos_start, pos_end) {
            this.element_nodes = element_nodes;
            this.pos_start = pos_start;
            this.pos_end = pos_end;
        }
        return ListNode;
    }());
    exports.ListNode = ListNode;
});
