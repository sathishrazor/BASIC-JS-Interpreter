define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IfNode = /** @class */ (function () {
        function IfNode(cases, else_case) {
            this.cases = cases;
            this.else_case = else_case;
            this.pos_start = this.cases[0][0].pos_start;
            this.pos_end = (this.else_case || this.cases[this.cases.length - 1])[0].pos_end;
        }
        return IfNode;
    }());
    exports.IfNode = IfNode;
});
