import { CodeError } from "./code_error"
import { LPosition } from "../core/position"
export class ExpectedCharError extends CodeError {
    constructor(pos_start: LPosition, pos_end: LPosition, details: string) {
        super(pos_start, pos_end, 'Expected Character', details);
    };
}

