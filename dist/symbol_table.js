define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SymbolTable = /** @class */ (function () {
        function SymbolTable(parent) {
            if (parent === void 0) { parent = null; }
            this.symbols = {};
            this.parent = parent;
        }
        SymbolTable.prototype.get = function (name) {
            var value = this.symbols.get(name, null);
            if (value == null && self.parent) {
                return this.parent.get(name);
            }
            return value;
        };
        SymbolTable.prototype.set = function (name, value) {
            this.symbols[name] = value;
        };
        SymbolTable.prototype.remove = function (name) {
            delete this.symbols[name];
        };
        return SymbolTable;
    }());
    exports.SymbolTable = SymbolTable;
});
