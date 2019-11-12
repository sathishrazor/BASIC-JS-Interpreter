import { Value } from "./Value"
import { RTError } from "../error/RT_error"
import { BNumber } from "./number"

export class List extends Value {
  elements: any;
  constructor(elements: any) {
    super();
    this.elements = elements;
  }

  copy(_this?: this) {
    if (!_this) {
      _this = this;
    }
    var copy = new List(_this.elements)
    copy.set_pos(_this.pos_start, _this.pos_end)
    copy.set_context(_this.context)
    return copy;
  }

  added_to(other: any, _this?: this) {
    if (!_this) {
      _this = this
    }
    var new_list: List = _this.copy();
    new_list.elements.push(other);
    return new_list;
  }

  subbed_by(other: any, _this?: this) {
    if (!_this) {
      _this = this
    }
    if (other instanceof BNumber) {
      var new_list: List = _this.copy()
      try {
        new_list.elements.pop(other.value)
        return new_list;
      }
      catch (e) {
        throw new RTError(
          other.pos_start, other.pos_end,
          'Element at _this index could not be\
             removed from list because index is out of bounds',
          _this.context
        )
      }
    }
    else {
      throw _this.illegal_operation(other)
    }
  }

  multed_by(other: any, _this?: this) {
    if (!_this) {
      _this = this
    }
    if (other instanceof List) {
      var new_list = _this.copy()
      new_list.elements.extend(other.elements)
      return new_list;
    }
    else
      return _this.illegal_operation(other)
  }

  dived_by(other: any, _this?: this) {
    if (!_this) {
      _this = this
    }
    if (other instanceof BNumber) {
      try {
        return _this.elements[other.value];
      } catch (e) {
        throw new RTError(
          other.pos_start, other.pos_end,
          'Element at _this index could not be retrieved from list because index is out of bounds',
          _this.context
        )
      }
    }
    else
      throw _this.illegal_operation(other)
  }

  toString() {
    return `[{", "${this.elements.join(",")}]`
  }

}