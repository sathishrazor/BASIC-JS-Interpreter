"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var code_error_1 = require("./code_error");
var InvalidSyntaxError = /** @class */ (function (_super) {
    __extends(InvalidSyntaxError, _super);
    function InvalidSyntaxError(pos_start, pos_end, details) {
        return _super.call(this, pos_start, pos_end, 'Invalid Syntax', details) || this;
    }
    ;
    return InvalidSyntaxError;
}(code_error_1.CodeError));
exports.InvalidSyntaxError = InvalidSyntaxError;
