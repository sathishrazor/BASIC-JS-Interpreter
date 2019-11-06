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
var ExpectedCharError = /** @class */ (function (_super) {
    __extends(ExpectedCharError, _super);
    function ExpectedCharError(pos_start, pos_end, details) {
        return _super.call(this, pos_start, pos_end, 'Expected Character', details) || this;
    }
    ;
    return ExpectedCharError;
}(code_error_1.CodeError));
exports.ExpectedCharError = ExpectedCharError;
