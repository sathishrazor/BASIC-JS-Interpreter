define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReturnNode = /** @class */ (function () {
        function ReturnNode(node_to_return, pos_start, pos_end) {
            this.node_to_return = node_to_return;
            this.pos_start = pos_start;
            this.pos_end = pos_end;
        }
        return ReturnNode;
    }());
    exports.ReturnNode = ReturnNode;
});
