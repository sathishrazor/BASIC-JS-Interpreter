import { RTError } from "../error/RT_error"
import { Value } from "./Value"
export class BNumber extends Value {
    value: any;
    static false: BNumber;
    static true: BNumber;
    static math_PI: BNumber;
    static null: BNumber;
    constructor(value: any) {
        super();
        this.value = value
    }
    added_to(other: any, _this?: this) {
        if (!_this) {
            _this = this
        }
        if (other instanceof BNumber) {
            return new BNumber(_this.value + other.value).set_context(_this.context)
        }
        else {
            throw _this.illegal_operation(other)
        }
    }

    subbed_by(other: any, _this?: this) {
        if (!_this) {
            _this = this
        }
        if (other instanceof BNumber) {
            return new BNumber(_this.value - other.value).set_context(_this.context);
        }
        else {
            throw _this.illegal_operation(other)
        }
    }

    multed_by(other: any, _this?: this) {
        if (!_this) {
            _this = this
        }
        if (other instanceof BNumber) {
            return new BNumber(_this.value * other.value).set_context(_this.context);
        }
        else {
            throw _this.illegal_operation(other)
        }
    }

    dived_by(other: any, _this?: this) {
        if (!_this) {
            _this = this
        }
        if (other instanceof BNumber) {
            if (other.value == 0) {
                return new RTError(other.pos_start, other.pos_end, 'Division by zero', _this.context)
            }
            return new BNumber(_this.value / other.value).set_context(_this.context)
        }
        else {
            throw _this.illegal_operation(other)
        }
    }

    powed_by(other: any, _this?: any) {
        if (!_this) {
            _this = this;
        }
        if (other instanceof BNumber) {
            return new BNumber(_this.value ** other.value).set_context(_this.context)
        }
        else {
            throw _this.illegal_operation(other)
        }
    }

    get_comparison_eq(other: any, _this?: any) {
        if (!_this) {
            _this = this;
        }
        if (other instanceof BNumber) {
            var temp = _this.value == other.value ? 1 : 0;
            return new BNumber(temp).set_context(_this.context)
        }
        else {
            throw _this.illegal_operation(other);
        }
    }


    get_comparison_ne(other: any, _this?: any) {
        if (!_this) {
            _this = this;
        }
        if (other instanceof BNumber) {
            var temp = _this.value != other.value ? 1 : 0
            return new BNumber(temp).set_context(_this.context);
        }
        else {
            throw _this.illegal_operation(other)
        }
    }


    get_comparison_lt(other: any, _this?: any) {
        if (!_this) {
            _this = this;
        }
        if (other instanceof BNumber) {
            var temp = _this.value < other.value ? 1 : 0;
            return new BNumber(temp).set_context(_this.context);
        }
        else {
            return _this.illegal_operation(other);
        }
    }

    get_comparison_gt(other: any, _this?: any) {
        if (!_this) {
            _this = this;
        }
        if (other instanceof BNumber) {
            var temp = _this.value > other.value ? 1 : 0;
            return new BNumber(temp).set_context(_this.context);
        }
        else {
            return _this.illegal_operation(other);
        }

    }

    get_comparison_lte(other: any, _this?: any) {
        if (!_this) {
            _this = this;
        }
        if (other instanceof BNumber) {
            var temp = _this.value <= other.value ? 1 : 0;
            return new BNumber(temp).set_context(_this.context);
        }
        else
            return _this.illegal_operation(other)
    }

    get_comparison_gte(other: any, _this?: any) {
        if (!_this) {
            _this = this
        }
        if (other instanceof BNumber) {
            var temp = _this.value >= other.value ? 1 : 0
            return new BNumber(temp).set_context(_this.context);
        }
        else
            return _this.illegal_operation(other)
    }

    anded_by(other: any, _this?: any) {
        if (!_this) {
            _this = this;
        }
        if (other instanceof BNumber) {
            var temp = _this.value && other.value ? 1 : 0;
            return new BNumber(temp).set_context(_this.context);
        }
        else
            return _this.illegal_operation(other)
    }

    ored_by(other: any, _this?: any) {
        if (!_this) {
            _this = this;
        }
        if (other instanceof BNumber) {
            var temp = _this.value || other.value ? 1 : 0;
            return new BNumber(temp).set_context(_this.context)
        }
        else
            return _this.illegal_operation(other)
    }

    notted(_this?: any) {
        if (!_this) {
            _this = this;
        }
        var temp = _this.value == 0 ? 1 : 0;
        return new BNumber(temp).set_context(_this.context)
    }

    copy(_this?: any) {
        if (!_this) {
            _this = this;
        }
        var copy = new BNumber(_this.value)
        copy.set_pos(_this.pos_start, _this.pos_end)
        copy.set_context(_this.context)
        return copy;
    }

    is_true(_this?: any) {
        if (!_this) {
            _this = this;
        }
        return _this.value != 0
    }

    toString() {
        return this.value;
    }
}

BNumber.null = new BNumber(0)
BNumber.false = new BNumber(0)
BNumber.true = new BNumber(1)
BNumber.math_PI = new BNumber(Math.PI)