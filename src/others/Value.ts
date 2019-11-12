import { RTError } from "../error/RT_error"
import { LPosition } from "../core/position"
import { RTResult } from "../core/RTResult"
export class Value {
    pos_start: LPosition | undefined;
    pos_end: LPosition | undefined;
    context: any;
    constructor() {
        this.set_pos()
        this.set_context()
    }
    set_pos(pos_start: LPosition | undefined = undefined,
        pos_end: LPosition | undefined = undefined) {
        this.pos_start = pos_start
        this.pos_end = pos_end
        return this
    }

    set_context(context = null) {
        this.context = context
        return this
    }

    added_to(other: any) {
        throw this.illegal_operation(other)
    }
    subbed_by(other: any) {
        throw this.illegal_operation(other)
    }
    multed_by(other: any) {
        throw this.illegal_operation(other)
    }
    dived_by(other: any) {
        throw this.illegal_operation(other)
    }
    powed_by(other: any) {
        throw this.illegal_operation(other)
    }
    get_comparison_eq(other: any) {
        throw this.illegal_operation(other)
    }
    get_comparison_ne(other: any) {
        throw this.illegal_operation(other)
    }
    get_comparison_lt(other: any) {
        throw this.illegal_operation(other)
    }
    get_comparison_gt(other: any) {
        throw this.illegal_operation(other)
    }
    get_comparison_lte(other: any) {
        throw this.illegal_operation(other)
    }
    get_comparison_gte(other: any) {
        throw this.illegal_operation(other)
    }
    anded_by(other: any) {
        throw this.illegal_operation(other)
    }
    ored_by(other: any) {
        throw this.illegal_operation(other)
    }
    notted() {
        throw this.illegal_operation()
    }
    execute(args: any[]) {
        throw new RTResult().failure(this.illegal_operation())
    }
    copy() {
        throw new Error('No copy method ined')
    }
    is_true() {
        return false;
    }
    illegal_operation(other: any = null) {
        
        if (!other) {
            other = this;
        }

        return new RTError(
            this.pos_start, other.pos_end,
            'Illegal operation',
            this.context
        )
    }
}
