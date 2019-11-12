define(["require", "exports", "./error/invalid_syntax_error", "./nodes/call_node", "./nodes/number_node", "./nodes/string_node", "./nodes/var_access_node", "./nodes/return_node", "./nodes/continue_node", "./nodes/break_node", "./nodes/var_assign_node", "./nodes/unary_operation_node", "./nodes/ListNode", "./nodes/if_node", "./nodes/for_node", "./nodes/while_node", "./nodes/function_definition_node", "./nodes/binary_operation_node", "./core/parse_result", "./others/token_value"], function (require, exports, invalid_syntax_error_1, call_node_1, number_node_1, string_node_1, var_access_node_1, return_node_1, continue_node_1, break_node_1, var_assign_node_1, unary_operation_node_1, ListNode_1, if_node_1, for_node_1, while_node_1, function_definition_node_1, binary_operation_node_1, parse_result_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Parser = /** @class */ (function () {
        function Parser(tokens) {
            this.tokens = tokens;
            this.tok_idx = -1;
            this.advance(this);
        }
        Parser.prototype.advance = function (_this) {
            if (!_this) {
                _this = this;
            }
            _this.tok_idx += 1;
            _this.update_current_tok(this);
            return _this.current_tok;
        };
        Parser.prototype.reverse = function (amount, _this) {
            if (amount === void 0) { amount = 1; }
            if (!_this) {
                _this = this;
            }
            _this.tok_idx -= amount;
            _this.update_current_tok();
            return _this.current_tok;
        };
        Parser.prototype.update_current_tok = function (_this) {
            if (!_this) {
                _this = this;
            }
            if (_this.tok_idx >= 0 && _this.tok_idx < _this.tokens.length) {
                _this.current_tok = _this.tokens[_this.tok_idx];
            }
        };
        Parser.prototype.parse = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = _this.statements(this);
            if ((!res.error) && _this.current_tok.type != TT_EOF) {
                throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Token cannot appear after previous tokens"));
            }
            return res;
        };
        Parser.prototype.statements = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var statements = [];
            var pos_start = _this.current_tok.pos_start.copy();
            while (_this.current_tok.type == TT_NEWLINE) {
                res.register_advancement(this);
                _this.advance();
            }
            var statement = res.register(_this.statement(this));
            if (res.error) {
                return res;
            }
            statements.push(statement);
            var more_statements = true;
            while (true) {
                var newline_count = 0;
                while (_this.current_tok.type == TT_NEWLINE) {
                    res.register_advancement();
                    _this.advance();
                    newline_count += 1;
                }
                if (newline_count == 0) {
                    more_statements = false;
                }
                if (!more_statements) {
                    break;
                }
                statement = res.try_register(_this.statement());
                if (!statement) {
                    _this.reverse(res.to_reverse_count);
                    more_statements = false;
                    continue;
                }
                statements.push(statement);
            }
            return res.success(new ListNode_1.ListNode(statements, pos_start, _this.current_tok.pos_end.copy()));
        };
        Parser.prototype.statement = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var pos_start = _this.current_tok.pos_start.copy();
            if (_this.current_tok.matches(TT_KEYWORD, "RETURN")) {
                res.register_advancement();
                _this.advance();
                var expr = res.try_register(_this.expr(this));
                if (!expr) {
                    _this.reverse(res.to_reverse_count);
                }
                return res.success(new return_node_1.ReturnNode(expr, pos_start, _this.current_tok.pos_start.copy()), this);
            }
            if (_this.current_tok.matches(TT_KEYWORD, "CONTINUE")) {
                res.register_advancement();
                _this.advance();
                return res.success(new continue_node_1.ContinueNode(pos_start, _this.current_tok.pos_start.copy()));
            }
            if (_this.current_tok.matches(TT_KEYWORD, "BREAK")) {
                res.register_advancement();
                _this.advance();
                return res.success(new break_node_1.BreakNode(pos_start, _this.current_tok.pos_start.copy()));
            }
            expr = res.register(_this.expr(this));
            if (res.error) {
                throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'RETURN', 'CONTINUE', 'BREAK', 'VAR', 'IF', 'FOR', 'WHILE', 'FUN', int, float, identifier, '+', '-', '(', '[' or 'NOT'"));
            }
            return res.success(expr);
        };
        Parser.prototype.expr = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            if (_this.current_tok.matches(TT_KEYWORD, "VAR")) {
                res.register_advancement();
                _this.advance();
                if (_this.current_tok.type != TT_IDENTIFIER) {
                    return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected identifier"));
                }
                var var_name = _this.current_tok;
                res.register_advancement();
                _this.advance();
                if (_this.current_tok.type != TT_EQ) {
                    return _this.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected '='"));
                }
                res.register_advancement();
                _this.advance();
                var expr = res.register(_this.expr());
                if (res.error) {
                    return res;
                }
                return res.success(new var_assign_node_1.VarAssignNode(var_name, expr));
            }
            var node = res.register(_this.bin_op(_this.comp_expr, [[TT_KEYWORD, "AND"], [TT_KEYWORD, "OR"]], this));
            if (res.error) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'VAR', 'IF', 'FOR', 'WHILE', 'FUN', int, float, identifier, '+', '-', '(', '[' or 'NOT'"));
            }
            return res.success(node);
        };
        Parser.prototype.failure = function (arg) {
            throw new Error("Method not implemented.");
        };
        Parser.prototype.comp_expr = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            if (_this.current_tok.matches(TT_KEYWORD, 'NOT')) {
                var op_tok = _this.current_tok;
                res.register_advancement();
                _this.advance();
                var node = res.register(_this.comp_expr(this), this);
                if (res.error) {
                    return res;
                }
                return res.success(new unary_operation_node_1.UnaryOpNode(op_tok, node));
            }
            node = res.register(_this.bin_op(_this.arith_expr, [TT_EE, TT_NE, TT_LT, TT_GT, TT_LTE, TT_GTE]), this);
            if (res.error) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected int, float, identifier, '+', '-', '(', '[', 'IF', 'FOR', 'WHILE', 'FUN' or 'NOT'"));
            }
            return res.success(node);
        };
        Parser.prototype.arith_expr = function (_this) {
            if (!_this) {
                _this = this;
            }
            return _this.bin_op(_this.term, [TT_PLUS, TT_MINUS]);
        };
        Parser.prototype.term = function (_this) {
            if (!_this) {
                _this = this;
            }
            return _this.bin_op(_this.factor, [TT_MUL, TT_DIV]);
        };
        Parser.prototype.factor = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var tok = _this.current_tok;
            if ([TT_PLUS, TT_MINUS].indexOf(tok.type) > -1) {
                res.register_advancement();
                _this.advance();
                var factor = res.register(_this.factor());
                if (res.error) {
                    return res;
                }
                return res.success(new unary_operation_node_1.UnaryOpNode(tok, factor));
            }
            return _this.power();
        };
        Parser.prototype.power = function (_this) {
            if (!_this) {
                _this = this;
            }
            return _this.bin_op(_this.call, [TT_POW], _this.factor);
        };
        Parser.prototype.call = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var atom = res.register(_this.atom(), this);
            if (res.error) {
                return res;
            }
            if (_this.current_tok.type == TT_LPAREN) {
                res.register_advancement();
                _this.advance();
                var arg_nodes = [];
                if (_this.current_tok.type == TT_RPAREN) {
                    res.register_advancement();
                    _this.advance();
                }
                else {
                    arg_nodes.push(res.register(_this.expr(this), this));
                    if (res.error) {
                        return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected ')', 'VAR', 'IF', 'FOR', 'WHILE', 'FUN', int, float, identifier, '+', '-', '(', '[' or 'NOT'"));
                    }
                    while (_this.current_tok.type == TT_COMMA) {
                        res.register_advancement();
                        _this.advance();
                        arg_nodes.push(res.register(_this.expr(this), this));
                        if (res.error)
                            return res;
                    }
                    if (_this.current_tok.type != TT_RPAREN) {
                        return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected ',' or ')'"));
                    }
                    res.register_advancement();
                    _this.advance();
                }
                return res.success(new call_node_1.CallNode(atom, arg_nodes));
            }
            return res.success(atom);
        };
        Parser.prototype.atom = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var tok = _this.current_tok;
            if (tok.type == TT_INT || tok.type == TT_FLOAT) {
                res.register_advancement();
                _this.advance();
                return res.success(new number_node_1.NumberNode(tok));
            }
            else if (tok.type == TT_STRING) {
                res.register_advancement();
                _this.advance();
                return res.success(new string_node_1.StringNode(tok));
            }
            else if (tok.type == TT_IDENTIFIER) {
                res.register_advancement();
                _this.advance();
                return res.success(new var_access_node_1.VarAccessNode(tok));
            }
            else if (tok.type == TT_LPAREN) {
                res.register_advancement();
                _this.advance();
                var expr = res.register(_this.expr(this), this);
                if (res.error) {
                    return res;
                }
                if (_this.current_tok.type == TT_RPAREN) {
                    res.register_advancement();
                    _this.advance();
                    return res.success(expr);
                }
                else {
                    throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected ')'"));
                }
            }
            else if (tok.type == TT_LSQUARE) {
                var list_expr = res.register(_this.list_expr(this), this);
                if (res.error) {
                    return res;
                }
                return res.success(list_expr);
            }
            else if (tok.matches(TT_KEYWORD, 'IF')) {
                var if_expr = res.register(_this.if_expr(this), this);
                if (res.error) {
                    return res;
                }
                return res.success(if_expr);
            }
            else if (tok.matches(TT_KEYWORD, 'FOR')) {
                var for_expr = res.register(_this.for_expr(this), this);
                if (res.error) {
                    return res;
                }
                return res.success(for_expr);
            }
            else if (tok.matches(TT_KEYWORD, 'WHILE')) {
                var while_expr = res.register(_this.while_expr(this), this);
                if (res.error) {
                    return res;
                }
                return res.success(while_expr);
            }
            else if (tok.matches(TT_KEYWORD, 'FUN')) {
                var func_def = res.register(_this.func_def(this), this);
                if (res.error) {
                    return res;
                }
                return res.success(func_def);
            }
            return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(tok.pos_start, tok.pos_end, "Expected int, float, identifier, '+', '-', '(', '[', IF', 'FOR', 'WHILE', 'FUN'"));
        };
        Parser.prototype.list_expr = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var element_nodes = [];
            var pos_start = _this.current_tok.pos_start.copy();
            if (_this.current_tok.type != TT_LSQUARE) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected '['"));
            }
            res.register_advancement();
            _this.advance();
            if (_this.current_tok.type == TT_RSQUARE) {
                res.register_advancement();
                _this.advance();
            }
            else {
                element_nodes.push(res.register(_this.expr(this), this));
                if (res.error) {
                    return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected ']', 'VAR', 'IF', 'FOR', 'WHILE', 'FUN', int, float, identifier, '+', '-', '(', '[' or 'NOT'"));
                }
                while (_this.current_tok.type == TT_COMMA) {
                    res.register_advancement();
                    _this.advance();
                    element_nodes.push(res.register(_this.expr(this), this));
                    if (res.error) {
                        return res;
                    }
                }
                if (_this.current_tok.type != TT_RSQUARE) {
                    return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected ',' or ']'"));
                }
                res.register_advancement();
                _this.advance();
            }
            return res.success(new ListNode_1.ListNode(element_nodes, pos_start, _this.current_tok.pos_end.copy()));
        };
        Parser.prototype.if_expr = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var all_cases = res.register(_this.if_expr_cases('IF'), this);
            if (res.error) {
                return res;
            }
            var cases = all_cases, else_case = all_cases;
            return res.success(new if_node_1.IfNode(cases, else_case));
        };
        Parser.prototype.if_expr_b = function (_this) {
            if (!_this) {
                _this = this;
            }
            return _this.if_expr_cases('ELIF');
        };
        Parser.prototype.if_expr_c = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var else_case = null;
            if (_this.current_tok.matches(TT_KEYWORD, 'ELSE')) {
                res.register_advancement();
                _this.advance();
                if (_this.current_tok.type == TT_NEWLINE) {
                    res.register_advancement();
                    _this.advance();
                    var statements = res.register(_this.statements(this), this);
                    if (res.error) {
                        return res;
                    }
                    else_case = [statements, true];
                    if (_this.current_tok.matches(TT_KEYWORD, 'END')) {
                        res.register_advancement();
                        _this.advance();
                    }
                    else {
                        return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'END'"));
                    }
                }
                else {
                    var expr = res.register(_this.statement(this), this);
                    if (res.error) {
                        return res;
                    }
                    else_case = [expr, false];
                }
                return res.success(else_case);
            }
        };
        Parser.prototype.if_expr_b_or_c = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var cases = [];
            var else_case = null;
            if (_this.current_tok.matches(TT_KEYWORD, 'ELIF')) {
                var all_cases = res.register(_this.if_expr_b(this), this);
                if (res.error) {
                    return res;
                }
                cases = all_cases;
                else_case = all_cases;
            }
            else {
                else_case = res.register(_this.if_expr_c(this), this);
                if (res.error) {
                    return res;
                }
            }
            return res.success([cases, else_case]);
        };
        Parser.prototype.if_expr_cases = function (case_keyword, _this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            var cases = [];
            var else_case = null;
            if (!_this.current_tok.matches(TT_KEYWORD, case_keyword)) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected '{case_keyword}'"));
            }
            res.register_advancement();
            _this.advance();
            var condition = res.register(_this.expr(this), this);
            if (res.error) {
                return res;
            }
            if (!_this.current_tok.matches(TT_KEYWORD, 'THEN')) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'THEN'"));
            }
            res.register_advancement();
            _this.advance();
            if (_this.current_tok.type == TT_NEWLINE) {
                res.register_advancement();
                _this.advance();
                var statements = res.register(_this.statements(this), this);
                if (res.error) {
                    return res;
                }
                cases.push([condition, statements, true]);
                if (_this.current_tok.matches(TT_KEYWORD, 'END')) {
                    res.register_advancement();
                    _this.advance();
                }
                else {
                    all_cases = res.register(_this.if_expr_b_or_c(this), this);
                    if (res.error) {
                        return res;
                    }
                    new_cases = all_cases;
                    else_case = all_cases;
                    cases.concat(new_cases);
                }
            }
            else {
                var expr = res.register(_this.statement(this), this);
                if (res.error) {
                    return res;
                }
                cases.push([condition, expr, false]);
                var all_cases = res.register(_this.if_expr_b_or_c(this), this);
                if (res.error) {
                    return res;
                }
                var new_cases = all_cases;
                else_case = all_cases;
                cases.concat(new_cases);
            }
            return res.success([cases, else_case]);
        };
        Parser.prototype.for_expr = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            if (!_this.current_tok.matches(TT_KEYWORD, 'FOR')) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'FOR'"));
            }
            res.register_advancement();
            _this.advance();
            if (_this.current_tok.type != TT_IDENTIFIER) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected identifier"));
            }
            var_name = _this.current_tok;
            res.register_advancement();
            _this.advance();
            if (_this.current_tok.type != TT_EQ) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected '='"));
            }
            res.register_advancement();
            _this.advance();
            var start_value = res.register(_this.expr(this), this);
            if (res.error) {
                return res;
            }
            if (!_this.current_tok.matches(TT_KEYWORD, 'TO')) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'TO'"));
            }
            res.register_advancement();
            _this.advance();
            var end_value = res.register(_this.expr(this), this);
            if (res.error) {
                return res;
            }
            if (_this.current_tok.matches(TT_KEYWORD, 'STEP')) {
                res.register_advancement();
                _this.advance();
            }
            var step_value = res.register(_this.expr(this), this);
            if (res.error) {
                return res;
            }
            else {
                step_value = null;
            }
            if (!_this.current_tok.matches(TT_KEYWORD, 'THEN')) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'THEN'"));
            }
            res.register_advancement();
            _this.advance();
            if (_this.current_tok.type == TT_NEWLINE) {
                res.register_advancement();
                _this.advance();
                var body = res.register(_this.statements());
                if (res.error) {
                    return res;
                }
                if (!_this.current_tok.matches(TT_KEYWORD, 'END')) {
                    return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'END'"));
                }
                var var_name = _this.current_tok;
                res.register_advancement();
                _this.advance();
                return res.success(new for_node_1.ForNode(var_name, start_value, end_value, step_value, body, true));
            }
            body = res.register(_this.statement(this), this);
            if (res.error) {
                return res;
            }
            return res.success(new for_node_1.ForNode(var_name, start_value, end_value, step_value, body, false));
        };
        Parser.prototype.while_expr = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            if (!_this.current_tok.matches(TT_KEYWORD, 'WHILE')) {
                throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'WHILE'"));
            }
            res.register_advancement();
            _this.advance();
            var condition = res.register(_this.expr(this), this);
            if (res.error) {
                return res;
            }
            if (!_this.current_tok.matches(TT_KEYWORD, 'THEN')) {
                return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'THEN'"));
            }
            res.register_advancement();
            _this.advance();
            if (_this.current_tok.type == TT_NEWLINE) {
                res.register_advancement();
                _this.advance();
                var body = res.register(_this.statements(this), this);
                if (res.error) {
                    return res;
                }
                if (!_this.current_tok.matches(TT_KEYWORD, 'END')) {
                    return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'END'"));
                }
                res.register_advancement();
                _this.advance();
                return res.success(new while_node_1.WhileNode(condition, body, true));
            }
            body = res.register(_this.statement(this), this);
            if (res.error) {
                return res;
            }
            return res.success(new while_node_1.WhileNode(condition, body, false));
        };
        Parser.prototype.func_def = function (_this) {
            if (!_this) {
                _this = this;
            }
            var res = new parse_result_1.ParseResult();
            if (!_this.current_tok.matches(TT_KEYWORD, 'FUN')) {
                throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'FUN'"));
            }
            res.register_advancement();
            _this.advance();
            if (_this.current_tok.type == TT_IDENTIFIER) {
                var_name_tok = _this.current_tok;
                res.register_advancement();
                _this.advance();
                if (_this.current_tok.type != TT_LPAREN) {
                    throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected '('"));
                }
            }
            else {
                var var_name_tok = null;
                if (_this.current_tok.type != TT_LPAREN) {
                    return res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected identifier or '('"));
                }
            }
            res.register_advancement();
            _this.advance();
            var arg_name_toks = [];
            if (_this.current_tok.type == TT_IDENTIFIER) {
                arg_name_toks.append(_this.current_tok);
                res.register_advancement();
                _this.advance();
                while (_this.current_tok.type == TT_COMMA) {
                    res.register_advancement();
                    _this.advance();
                    if (_this.current_tok.type != TT_IDENTIFIER) {
                        throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected identifier"));
                    }
                    arg_name_toks.append(_this.current_tok);
                    res.register_advancement();
                    _this.advance();
                }
                if (_this.current_tok.type != TT_RPAREN) {
                    throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected ',' or ')'"));
                }
            }
            else {
                if (_this.current_tok.type != TT_RPAREN) {
                    throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected identifier or ')'"));
                }
            }
            res.register_advancement();
            _this.advance();
            if (_this.current_tok.type == TT_ARROW) {
                res.register_advancement();
                _this.advance();
                var body = res.register(_this.expr(this), this);
                if (res.error) {
                    return res;
                }
                return res.success(new function_definition_node_1.FuncDefNode(var_name_tok, arg_name_toks, body, true));
            }
            if (_this.current_tok.type != TT_NEWLINE) {
                throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected '->' or NEWLINE"));
            }
            res.register_advancement();
            _this.advance();
            body = res.register(_this.statements(this), this);
            if (res.error) {
                return res;
            }
            if (_this.current_tok.matches(TT_KEYWORD, 'END')) {
                throw res.failure(new invalid_syntax_error_1.InvalidSyntaxError(_this.current_tok.pos_start, _this.current_tok.pos_end, "Expected 'END'"));
            }
            res.register_advancement();
            _this.advance();
            return res.success(new function_definition_node_1.FuncDefNode(var_name_tok, arg_name_toks, body, false));
        };
        Parser.prototype.bin_op = function (func_a, ops, func_b, _this) {
            if (func_b === void 0) { func_b = null; }
            if (!_this) {
                _this = this;
            }
            if (func_b == null) {
                func_b = func_a;
            }
            var res = new parse_result_1.ParseResult();
            var left = res.register(func_a(this), this);
            if (res.error) {
                return res;
            }
            while (ops.indexOf(_this.current_tok.type) > -1
                || [_this.current_tok.type, _this.current_tok.value].indexOf(ops) > -1) {
                var op_tok = _this.current_tok;
                res.register_advancement();
                _this.advance();
                var right = res.register(func_b(this), this);
                if (res.error) {
                    return res;
                }
                left = new binary_operation_node_1.BinOpNode(left, op_tok, right);
            }
            return res.success(left);
        };
        return Parser;
    }());
    exports.Parser = Parser;
});
