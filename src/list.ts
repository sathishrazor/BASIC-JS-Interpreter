import { Value } from "./Value"
import { RTError } from "./error/RT_error"
import { BNumber } from "./number"

export class List extends Value {
  elements: any;

  constructor(elements: any) {
    super();
    this.elements = elements
  }

  copy() {
    var copy = new List(this.elements)
    copy.set_pos(this.pos_start, this.pos_end)
    copy.set_context(this.context)
    return copy;
  }

  added_to(other: any) {
    var new_list: List = this.copy();
    new_list.elements.push(other);
    return new_list;
  }

  subbed_by(other: any) {
    if (other instanceof BNumber) {
      var new_list: List = this.copy()
      try {
        new_list.elements.pop(other.value)
        return new_list;
      }
      catch (e) {
        throw new RTError(
          other.pos_start, other.pos_end,
          'Element at this index could not be\
             removed from list because index is out of bounds',
          this.context
        )
      }
    }
    else {
      return this.illegal_operation(other)
    }
  }

  multed_by(other: any) {
    if (other instanceof List) {
      var new_list = this.copy()
      new_list.elements.extend(other.elements)
      return new_list;
    }
    else
      return this.illegal_operation(other)
  }

  dived_by(other: any) {
    if (other instanceof BNumber) {
      try {
        return this.elements[other.value];
      } catch (e) {
        throw new RTError(
          other.pos_start, other.pos_end,
          'Element at this index could not be retrieved from list because index is out of bounds',
          this.context
        )
      }
    }
    else
      return this.illegal_operation(other)
  }

  toString() {
    return `[{", "${this.elements.join(",")}]`
  }

}