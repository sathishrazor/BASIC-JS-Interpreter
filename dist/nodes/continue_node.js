define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ContinueNode = /** @class */ (function () {
        function ContinueNode(pos_start, pos_end) {
            this.pos_start = pos_start;
            this.pos_end = pos_end;
        }
        return ContinueNode;
    }());
    exports.ContinueNode = ContinueNode;
});
