define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BreakNode = /** @class */ (function () {
        function BreakNode(pos_start, pos_end) {
            this.pos_start = pos_start;
            this.pos_end = pos_end;
        }
        return BreakNode;
    }());
    exports.BreakNode = BreakNode;
});
