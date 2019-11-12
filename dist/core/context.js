define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Context = /** @class */ (function () {
        function Context(display_name, parent, parent_entry_pos) {
            if (parent === void 0) { parent = null; }
            if (parent_entry_pos === void 0) { parent_entry_pos = null; }
            this.display_name = display_name;
            this.parent = parent;
            this.parent_entry_pos = parent_entry_pos;
            this.symbol_table = null;
        }
        return Context;
    }());
    exports.Context = Context;
});
