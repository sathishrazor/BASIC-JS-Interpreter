"use strict";
exports.__esModule = true;
var CodeError = /** @class */ (function () {
    function CodeError(pos_start, pos_end, error_name, details) {
        this.pos_start = pos_start;
        this.pos_end = pos_end;
        this.error_name = error_name;
        this.details = details;
    }
    CodeError.prototype.as_string = function () {
        return "{this.error_name}: {this.details}\n\n        File {this.pos_start.fn}, line {this.pos_start.ln + 1}\n       '\n\n' {this.pos_start.ftxt}::{this.pos_start}::{this.pos_end}";
    };
    return CodeError;
}());
exports.CodeError = CodeError;
