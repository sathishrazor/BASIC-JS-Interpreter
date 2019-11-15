
import { InvalidSyntaxError } from "./error/invalid_syntax_error";
import { CallNode } from "./nodes/call_node";
import { NumberNode } from "./nodes/number_node";
import { StringNode } from "./nodes/string_node";
import { VarAccessNode } from "./nodes/var_access_node";
import { ReturnNode } from "./nodes/return_node";
import { ContinueNode } from "./nodes/continue_node";
import { BreakNode } from "./nodes/break_node";
import { VarAssignNode } from "./nodes/var_assign_node";
import { UnaryOpNode } from "./nodes/unary_operation_node";
import { ListNode } from "./nodes/ListNode";
import { IfNode } from "./nodes/if_node";
import { ForNode } from "./nodes/for_node";
import { WhileNode } from "./nodes/while_node";
import { FuncDefNode } from "./nodes/function_definition_node";
import { BinOpNode } from "./nodes/binary_operation_node";
import { Token } from "./others/tokens";
import "./others/token_value";
import { ParseResult } from "./core/parse_result";
export class Parser {
  tokens: Token[];
  tok_idx: number;
  current_tok: any;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.tok_idx = -1;
    this.advance(this);
  }

  advance(_this?: any) {
    if (!_this) {
      _this = this;
    }
    _this.tok_idx += 1;
    _this.update_current_tok(this);
    return _this.current_tok;
  }

  reverse(amount: number = 1, _this?: any) {
    if (!_this) {
      _this = this;
    }
    _this.tok_idx -= amount;
    _this.update_current_tok();
    return _this.current_tok;
  }

  update_current_tok(_this?: any) {
    if (!_this) {
      _this = this;
    }
    if (_this.tok_idx >= 0 && _this.tok_idx < _this.tokens.length) {
      _this.current_tok = _this.tokens[_this.tok_idx];
    }
  }

  parse(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res: any = _this.statements(this);
    if ((!res.error) && _this.current_tok.type != TT_EOF) {
      throw res.failure(
        new InvalidSyntaxError(
          _this.current_tok.pos_start,
          _this.current_tok.pos_end,
          "Token cannot appear after previous tokens"
        )
      );
    }
    return res;
  }

  statements(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult();
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
    return res.success(new ListNode(
      statements,
      pos_start,
      _this.current_tok.pos_end.copy()
    ))
  }

  statement(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult();
    var pos_start = _this.current_tok.pos_start.copy();
    if (_this.current_tok.matches(TT_KEYWORD, "RETURN")) {
      res.register_advancement();
      _this.advance();
      var expr = res.try_register(_this.expr(this));
      if (!expr) {
        _this.reverse(res.to_reverse_count);
      }
      return res.success(
        new ReturnNode(expr, pos_start, _this.current_tok.pos_start.copy()), this
      );
    }

    if (_this.current_tok.matches(TT_KEYWORD, "CONTINUE")) {
      res.register_advancement();
      _this.advance();
      return res.success(
        new ContinueNode(pos_start, _this.current_tok.pos_start.copy())
      );
    }

    if (_this.current_tok.matches(TT_KEYWORD, "BREAK")) {
      res.register_advancement();
      _this.advance();
      return res.success(
        new BreakNode(pos_start, _this.current_tok.pos_start.copy())
      );
    }

    expr = res.register(_this.expr(this));
    if (res.error) {
      throw res.failure(
        new InvalidSyntaxError(
          _this.current_tok.pos_start,
          _this.current_tok.pos_end,
          "Expected 'RETURN', 'CONTINUE', 'BREAK', 'VAR', 'IF', 'FOR', 'WHILE', 'FUN', int, float, identifier, '+', '-', '(', '[' or 'NOT'"
        )
      );
    }

    return res.success(expr);
  }

  expr(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult();
    if (_this.current_tok.matches(TT_KEYWORD, "VAR")) {
      res.register_advancement();
      _this.advance();
      if (_this.current_tok.type != TT_IDENTIFIER) {
        return res.failure(
          new InvalidSyntaxError(
            _this.current_tok.pos_start,
            _this.current_tok.pos_end,
            "Expected identifier"
          )
        );
      }
      var var_name = _this.current_tok;
      res.register_advancement();
      _this.advance();

      if (_this.current_tok.type != TT_EQ) {
        return _this.failure(
          new InvalidSyntaxError(
            _this.current_tok.pos_start,
            _this.current_tok.pos_end,
            "Expected '='"
          )
        );
      }
      res.register_advancement();
      _this.advance();
      var expr = res.register(_this.expr());
      if (res.error) {
        return res;
      }
      return res.success(new VarAssignNode(var_name, expr));
    }

    var node = res.register(
      _this.bin_op(_this.comp_expr, [[TT_KEYWORD, "AND"], [TT_KEYWORD, "OR"]], this)
    );

    if (res.error) {
      return res.failure(
        new InvalidSyntaxError(
          _this.current_tok.pos_start,
          _this.current_tok.pos_end,
          "Expected 'VAR', 'IF', 'FOR', 'WHILE', 'FUN', int, float, identifier, '+', '-', '(', '[' or 'NOT'"
        )
      );
    }

    return res.success(node);
  }

  failure(arg: InvalidSyntaxError) {
    throw new Error("Method not implemented.");
  }


  comp_expr(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult()
    if (_this.current_tok.matches(TT_KEYWORD, 'NOT')) {
      var op_tok = _this.current_tok;
      res.register_advancement()
      _this.advance()
      var node = res.register(_this.comp_expr(this), this)
      if (res.error) { return res; }
      return res.success(new UnaryOpNode(op_tok, node))
    }

    node = res.register(_this.bin_op(_this.arith_expr, [TT_EE, TT_NE, TT_LT, TT_GT, TT_LTE, TT_GTE]), this)

    if (res.error) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected int, float, identifier, '+', '-', '(', '[', 'IF', 'FOR', 'WHILE', 'FUN' or 'NOT'"
      ));
    }


    return res.success(node)
  }



  arith_expr(_this?: any) {
    if (!_this) {
      _this = this;
    }
    return _this.bin_op(_this.term, [TT_PLUS, TT_MINUS])
  }

  term(_this?: any) {
    if (!_this) {
      _this = this;
    }
    return _this.bin_op(_this.factor, [TT_MUL, TT_DIV])
  }


  factor(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult();
    var tok = _this.current_tok;
    if ([TT_PLUS, TT_MINUS].indexOf(tok.type) > -1) {
      res.register_advancement();
      _this.advance();
      var factor = res.register(_this.factor())
      if (res.error) { return res }
      return res.success(new UnaryOpNode(tok, factor))
    }
    return _this.power()
  }


  power(_this?: any) {
    if (!_this) {
      _this = this;
    }
    return _this.bin_op(_this.call, [TT_POW], _this.factor)
  }

  call(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult()
    var atom = res.register(_this.atom(), this);
    if (res.error) { return res; }

    if (_this.current_tok.type == TT_LPAREN) {
      res.register_advancement()
      _this.advance()
      var arg_nodes: any[] = [];

      if (_this.current_tok.type == TT_RPAREN) {
        res.register_advancement()
        _this.advance()
      } else {
        arg_nodes.push(res.register(_this.expr(this), this))
        if (res.error) {
          return res.failure(new InvalidSyntaxError(
            _this.current_tok.pos_start, _this.current_tok.pos_end,
            "Expected ')', 'VAR', 'IF', 'FOR', 'WHILE', 'FUN', int, float, identifier, '+', '-', '(', '[' or 'NOT'"
          ))
        }
        while (_this.current_tok.type == TT_COMMA) {
          res.register_advancement()
          _this.advance();
          arg_nodes.push(res.register(_this.expr(this), this))
          if (res.error) return res;
        }
        if (_this.current_tok.type != TT_RPAREN) {
          return res.failure(new InvalidSyntaxError(
            _this.current_tok.pos_start, _this.current_tok.pos_end,
            "Expected ',' or ')'"
          ))
        }
        res.register_advancement()
        _this.advance()
      }
      return res.success(new CallNode(atom, arg_nodes))
    }
    return res.success(atom)
  }

  atom(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult()
    var tok = _this.current_tok

    if (tok.type == TT_INT || tok.type == TT_FLOAT) {
      res.register_advancement()
      _this.advance()
      return res.success(new NumberNode(tok))
    }
    else if (tok.type == TT_STRING) {
      res.register_advancement()
      _this.advance()
      return res.success(new StringNode(tok))
    }
    else if (tok.type == TT_IDENTIFIER) {
      res.register_advancement()
      _this.advance()
      return res.success(new VarAccessNode(tok))
    }
    else if (tok.type == TT_LPAREN) {
      res.register_advancement()
      _this.advance()
      var expr = res.register(_this.expr(this), this)
      if (res.error) { return res; }
      if (_this.current_tok.type == TT_RPAREN) {
        res.register_advancement()
        _this.advance()
        return res.success(expr)
      }
      else {
        throw res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected ')'"
        ))
      }
    }
    else if (tok.type == TT_LSQUARE) {
      var list_expr = res.register(_this.list_expr(this), this)
      if (res.error) { return res; }
      return res.success(list_expr)
    }
    else if (tok.matches(TT_KEYWORD, 'IF')) {
      var if_expr = res.register(_this.if_expr(this), this)
      if (res.error) { return res; }
      return res.success(if_expr)
    }
    else if (tok.matches(TT_KEYWORD, 'FOR')) {
      var for_expr = res.register(_this.for_expr(this), this)
      if (res.error) { return res; }
      return res.success(for_expr);
    }
    else if (tok.matches(TT_KEYWORD, 'WHILE')) {
      var while_expr = res.register(_this.while_expr(this), this)
      if (res.error) { return res; }
      return res.success(while_expr)
    }
    else if (tok.matches(TT_KEYWORD, 'FUN')) {
      var func_def = res.register(_this.func_def(this), this)
      if (res.error) { return res; }
      return res.success(func_def)
    }
    return res.failure(new InvalidSyntaxError(
      tok.pos_start, tok.pos_end,
      "Expected int, float, identifier, '+', '-', '(', '[', IF', 'FOR', 'WHILE', 'FUN'"
    ));

  }

  list_expr(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult();
    var element_nodes = []
    var pos_start = _this.current_tok.pos_start.copy()
    if (_this.current_tok.type != TT_LSQUARE) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected '['"
      ))
    }
    res.register_advancement();
    _this.advance();

    if (_this.current_tok.type == TT_RSQUARE) {
      res.register_advancement()
      _this.advance()
    }
    else {
      element_nodes.push(res.register(_this.expr(this), this))
      if (res.error) {
        return res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected ']', 'VAR', 'IF', 'FOR', 'WHILE', 'FUN', int, float, identifier, '+', '-', '(', '[' or 'NOT'"
        ))
      }
      while (_this.current_tok.type == TT_COMMA) {
        res.register_advancement()
        _this.advance()

        element_nodes.push(res.register(_this.expr(this), this))
        if (res.error) { return res; }
      }
      if (_this.current_tok.type != TT_RSQUARE) {
        return res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected ',' or ']'"
        ))
      }

      res.register_advancement()
      _this.advance()
    }
    return res.success(new ListNode(
      element_nodes,
      pos_start,
      _this.current_tok.pos_end.copy()
    ))
  }



  if_expr(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult()
    var all_cases = res.register(_this.if_expr_cases('IF'), this)
    if (res.error) { return res; }
    var cases = all_cases[0];
    var else_case = all_cases[1];
    return res.success(new IfNode(cases, else_case))
  }
  if_expr_b(_this?: any) {
    if (!_this) {
      _this = this;
    }
    return _this.if_expr_cases('ELIF')
  }

  if_expr_c(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult();
    var else_case = null;

    if (_this.current_tok.matches(TT_KEYWORD, 'ELSE')) {
      res.register_advancement();
      _this.advance();
      if (_this.current_tok.type == TT_NEWLINE) {
        res.register_advancement();
        _this.advance();
        var statements = res.register(_this.statements(this), this)
        if (res.error) { return res; }
        else_case = [statements, true]
        if (_this.current_tok.matches(TT_KEYWORD, 'END')) {
          res.register_advancement()
          _this.advance()

        }
        else {
          throw res.failure(new InvalidSyntaxError(
            _this.current_tok.pos_start, _this.current_tok.pos_end,
            "Expected 'END'"
          ))
        }
      }
      else {
        var expr = res.register(_this.statement(this), this)
        if (res.error) { return res; }
        else_case = [expr, false]
      }
      return res.success(else_case)
    }
  }


  if_expr_b_or_c(_this?: any, ) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult();
    var cases = []; var else_case = null;
    if (_this.current_tok.matches(TT_KEYWORD, 'ELIF')) {
      var all_cases = res.register(_this.if_expr_b(this), this)
      if (res.error) { return res; }
      cases = all_cases[0];
      else_case = all_cases[1];
    }
    else {
      else_case = res.register(_this.if_expr_c(this), this)
      if (res.error) { return res; }
    }

    return res.success([cases, else_case])
  }

  if_expr_cases(case_keyword: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult()
    var cases = [];
    var else_case = null;
    if (!_this.current_tok.matches(TT_KEYWORD, case_keyword)) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        `Expected '{case_keyword}'`
      ))
    }

    res.register_advancement()
    _this.advance()

    var condition = res.register(_this.expr(this), this)
    if (res.error) { return res; }

    if (!_this.current_tok.matches(TT_KEYWORD, 'THEN')) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        `Expected 'THEN'`
      ))
    }

    res.register_advancement()
    _this.advance()
    if (_this.current_tok.type == TT_NEWLINE) {
      res.register_advancement()
      _this.advance()
      var statements = res.register(_this.statements(this), this)
      if (res.error) { return res; }
      cases.push([condition, statements, true])
      if (_this.current_tok.matches(TT_KEYWORD, 'END')) {
        res.register_advancement()
        _this.advance()
      }
      else {
        all_cases = res.register(_this.if_expr_b_or_c(this), this)
        if (res.error) { return res }
        new_cases = all_cases[0];
        else_case = all_cases[1];
        cases.concat(new_cases)
      }
    }
    else {
      var expr = res.register(_this.statement(this), this)
      if (res.error) { return res }
      cases.push([condition, expr, false])
      var all_cases: any[] = res.register(_this.if_expr_b_or_c(this), this)
      if (res.error) { return res; }
      var new_cases = all_cases[0];
      else_case = all_cases[1]
      cases.concat(new_cases)
    }
    return res.success([cases, else_case])
  }

  for_expr(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult()

    if (!_this.current_tok.matches(TT_KEYWORD, 'FOR')) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected 'FOR'"
      ))
    }
    res.register_advancement()
    _this.advance()

    if (_this.current_tok.type != TT_IDENTIFIER) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected identifier"
      ));
    }

    var_name = _this.current_tok;
    res.register_advancement();
    _this.advance();

    if (_this.current_tok.type != TT_EQ) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected '='"
      ))
    }
    res.register_advancement()
    _this.advance()
    var start_value = res.register(_this.expr(this), this)
    if (res.error) { return res }
    if (!_this.current_tok.matches(TT_KEYWORD, 'TO')) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected 'TO'"
      ))
    }
    res.register_advancement()
    _this.advance()
    var end_value = res.register(_this.expr(this), this)
    if (res.error) { return res; }
    if (_this.current_tok.matches(TT_KEYWORD, 'STEP')) {
      res.register_advancement()
      _this.advance()

    }
    var step_value = res.register(_this.expr(this), this)
    if (res.error) { return res }
    else {
      step_value = null;
    }
    if (!_this.current_tok.matches(TT_KEYWORD, 'THEN')) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected 'THEN'"
      ))
    }
    res.register_advancement()
    _this.advance()
    if (_this.current_tok.type == TT_NEWLINE) {
      res.register_advancement()
      _this.advance()
      var body = res.register(_this.statements())
      if (res.error) { return res }
      if (!_this.current_tok.matches(TT_KEYWORD, 'END')) {
        return res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected 'END'"
        ))
      }
      var var_name = _this.current_tok
      res.register_advancement()
      _this.advance()
      return res.success(new ForNode(var_name, start_value, end_value, step_value, body, true))
    }
    body = res.register(_this.statement(this), this)
    if (res.error) { return res; }
    return res.success(new ForNode(var_name, start_value, end_value, step_value, body, false))
  }

  while_expr(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult()

    if (!_this.current_tok.matches(TT_KEYWORD, 'WHILE')) {
      throw res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected 'WHILE'"
      ))
    }

    res.register_advancement()
    _this.advance()

    var condition = res.register(_this.expr(this), this)
    if (res.error) { return res }

    if (!_this.current_tok.matches(TT_KEYWORD, 'THEN')) {
      return res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected 'THEN'"
      ))
    }
    res.register_advancement()
    _this.advance()
    if (_this.current_tok.type == TT_NEWLINE) {
      res.register_advancement()
      _this.advance()
      var body = res.register(_this.statements(this), this)
      if (res.error) { return res; }
      if (!_this.current_tok.matches(TT_KEYWORD, 'END')) {
        return res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected 'END'"
        ))
      }
      res.register_advancement()
      _this.advance()
      return res.success(new WhileNode(condition, body, true))
    }

    body = res.register(_this.statement(this), this)
    if (res.error) { return res }

    return res.success(new WhileNode(condition, body, false))
  }

  func_def(_this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new ParseResult()
    if (!_this.current_tok.matches(TT_KEYWORD, 'FUN')) {
      throw res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected 'FUN'"
      ))
    }
    res.register_advancement()
    _this.advance()
    if (_this.current_tok.type == TT_IDENTIFIER) {
      var_name_tok = _this.current_tok
      res.register_advancement()
      _this.advance()
      if (_this.current_tok.type != TT_LPAREN) {
        throw res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected '('"
        ))
      }
    }
    else {
      var var_name_tok = null;
      if (_this.current_tok.type != TT_LPAREN) {
        return res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected identifier or '('"
        ))
      }
    }
    res.register_advancement()
    _this.advance()
    var arg_name_toks: any = []

    if (_this.current_tok.type == TT_IDENTIFIER) {
      arg_name_toks.push(_this.current_tok)
      res.register_advancement()
      _this.advance()
      while (_this.current_tok.type == TT_COMMA) {
        res.register_advancement()
        _this.advance()

        if (_this.current_tok.type != TT_IDENTIFIER) {
          throw res.failure(new InvalidSyntaxError(
            _this.current_tok.pos_start, _this.current_tok.pos_end,
            "Expected identifier"
          ))
        }
        arg_name_toks.push(_this.current_tok)
        res.register_advancement()
        _this.advance()
      }
      if (_this.current_tok.type != TT_RPAREN) {
        throw res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected ',' or ')'"
        ))
      }
    }
    else {
      if (_this.current_tok.type != TT_RPAREN) {
        throw res.failure(new InvalidSyntaxError(
          _this.current_tok.pos_start, _this.current_tok.pos_end,
          "Expected identifier or ')'"
        ))
      }

    }
    res.register_advancement()
    _this.advance()

    if (_this.current_tok.type == TT_ARROW) {
      res.register_advancement()
      _this.advance()
      var body = res.register(_this.expr(this), this)
      if (res.error) { return res }
      return res.success(new FuncDefNode(
        var_name_tok,
        arg_name_toks,
        body,
        true
      ))
    }

    if (_this.current_tok.type != TT_NEWLINE) {
      throw res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected '->' or NEWLINE"
      ))
    }

    res.register_advancement()
    _this.advance()

    body = res.register(_this.statements(this), this)
    if (res.error) { return res }
    if (_this.current_tok.matches(TT_KEYWORD, 'END')) {
      throw res.failure(new InvalidSyntaxError(
        _this.current_tok.pos_start, _this.current_tok.pos_end,
        "Expected 'END'"
      ))
    }
    res.register_advancement()
    _this.advance()
    return res.success(new FuncDefNode(
      var_name_tok,
      arg_name_toks,
      body,
      false
    ))
  }

  bin_op(func_a: any, ops: any, func_b: any = null, _this?: any) {
    if (!_this) {
      _this = this;
    }
    if (func_b == null) {
      func_b = func_a
    }
    var res = new ParseResult()
    var left = res.register(func_a(this), this)
    if (res.error) { return res; }
    while (ops.indexOf(_this.current_tok.type) > -1
      || [_this.current_tok.type, _this.current_tok.value].indexOf(ops) > -1) {
      var op_tok = _this.current_tok
      res.register_advancement()
      _this.advance()
      var right = res.register(func_b(this), this)
      if (res.error) { return res; }
      left = new BinOpNode(left, op_tok, right)
    }
    return res.success(left)
  }



}
