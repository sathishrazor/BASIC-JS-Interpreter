import { Value } from "./Value"
import { BNumber } from "./number"

export class BString extends Value {
  value: any;
  constructor(value: any) {
    super()
    this.value = value
  }

  added_to(other: any) {
    if (other instanceof BString) {
      return new BString(this.value + other.value).set_context(this.context);
    }
    else {
      throw this.illegal_operation(other)
    }
  }

  multed_by(other: any) {
    if (other instanceof BNumber) {
      return new BString(this.value * other.value).set_context(this.context);
    }
    else {
      throw this.illegal_operation(other)
    }
  }

  is_true() {
    return this.value.length > 0
  }

  copy() {
    var copy = new BString(this.value)
    copy.set_pos(this.pos_start, this.pos_end)
    copy.set_context(this.context)
    return copy
  }

  toBString() {
    return `"{this.value}"`;
  }

}
