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
define(["require", "exports", "./Value", "../error/RT_error", "./number"], function (require, exports, Value_1, RT_error_1, number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(elements) {
            var _this_1 = _super.call(this) || this;
            _this_1.elements = elements;
            return _this_1;
        }
        List.prototype.copy = function (_this) {
            if (!_this) {
                _this = this;
            }
            var copy = new List(_this.elements);
            copy.set_pos(_this.pos_start, _this.pos_end);
            copy.set_context(_this.context);
            return copy;
        };
        List.prototype.added_to = function (other, _this) {
            if (!_this) {
                _this = this;
            }
            var new_list = _this.copy();
            new_list.elements.push(other);
            return new_list;
        };
        List.prototype.subbed_by = function (other, _this) {
            if (!_this) {
                _this = this;
            }
            if (other instanceof number_1.BNumber) {
                var new_list = _this.copy();
                try {
                    new_list.elements.pop(other.value);
                    return new_list;
                }
                catch (e) {
                    throw new RT_error_1.RTError(other.pos_start, other.pos_end, 'Element at _this index could not be\
             removed from list because index is out of bounds', _this.context);
                }
            }
            else {
                throw _this.illegal_operation(other);
            }
        };
        List.prototype.multed_by = function (other, _this) {
            if (!_this) {
                _this = this;
            }
            if (other instanceof List) {
                var new_list = _this.copy();
                new_list.elements.extend(other.elements);
                return new_list;
            }
            else
                return _this.illegal_operation(other);
        };
        List.prototype.dived_by = function (other, _this) {
            if (!_this) {
                _this = this;
            }
            if (other instanceof number_1.BNumber) {
                try {
                    return _this.elements[other.value];
                }
                catch (e) {
                    throw new RT_error_1.RTError(other.pos_start, other.pos_end, 'Element at _this index could not be retrieved from list because index is out of bounds', _this.context);
                }
            }
            else
                throw _this.illegal_operation(other);
        };
        List.prototype.toString = function () {
            return "[{\", \"" + this.elements.join(",") + "]";
        };
        return List;
    }(Value_1.Value));
    exports.List = List;
});
