import { RTResult } from "./core/RTResult";
import { BNumber } from "./others/number";
import { BString } from "./others/string";
import { List } from "./others/list";
import { RTError } from "./error/RT_error";
import { Function } from "./function/function";
export class Interpreter {

  visit(node: any, context: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    var method_name: string = `visit_${node.constructor.name}`
    var method: any = _this.getmethod(_this, method_name);
    return method(node, context, _this)
  }

  getmethod(ctx: any, name: string) {

    return ctx[name];
  }

  no_visit_method(node: any, context: any) {
    throw new Error('No visit_{type(node).__name__} method defined');
  }

  visit_NumberNode(node: any, context: any) {
    return new RTResult().success(
      new BNumber(node.tok.value)
        .set_context(context)
        .set_pos(node.pos_start, node.pos_end)
    )
  }

  visit_StringNode(node: any, context: any,_this:any) {
  
    return new RTResult().success(
      new BString(node.tok.value)
        .set_context(context)
        .set_pos(node.pos_start, node.pos_end)
    )
  }

  visit_ListNode(node: any, context: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new RTResult()
    var elements: any[] = [];
    var self = _this;
    node.element_nodes.forEach(function (c: any, i: number, a: any[]) {
      elements.push(res.register(self.visit(c, context)))
      if (res.should_return()) { return res }
    })
    return res.success(
      new List(elements).set_context(context).set_pos(node.pos_start, node.pos_end)
    )
  }

  visit_VarAccessNode(node: any, context: any) {
    var res = new RTResult()
    var var_name = node.var_name_tok.value
    var value = context.symbol_table.get(var_name)
    if (!value)
      throw res.failure(new RTError(
        node.pos_start, node.pos_end,
        `${var_name}' is not defined`,
        context
      ))
    value = value.copy().set_pos(node.pos_start, node.pos_end).set_context(context)
    return res.success(value)
  }

  visit_VarAssignNode(node: any, context: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new RTResult()
    var var_name = node.var_name_tok.value
    var value = res.register(_this.visit(node.value_node, context))
    if (res.should_return()) return res
    context.symbol_table.set(var_name, value)
    return res.success(value)
  }
  visit_BinOpNode(node: any, context: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new RTResult()
    var left = res.register(_this.visit(node.left_node, context))
    if (res.should_return()) return res;
    var right = res.register(_this.visit(node.right_node, context))
    if (res.should_return()) return res
    var result: any = undefined;
    if (node.op_tok.type == TT_PLUS)
      result = left.added_to(right);
    else if (node.op_tok.type == TT_MINUS)
      result = left.subbed_by(right);
    else if (node.op_tok.type == TT_MUL)
      result = left.multed_by(right)
    else if (node.op_tok.type == TT_DIV)
      result = left.dived_by(right)
    else if (node.op_tok.type == TT_POW)
      result = left.powed_by(right)
    else if (node.op_tok.type == TT_EE)
      result = left.get_comparison_eq(right)
    else if (node.op_tok.type == TT_NE)
      result = left.get_comparison_ne(right)
    else if (node.op_tok.type == TT_LT)
      result = left.get_comparison_lt(right)
    else if (node.op_tok.type == TT_GT)
      result = left.get_comparison_gt(right)
    else if (node.op_tok.type == TT_LTE)
      result = left.get_comparison_lte(right)
    else if (node.op_tok.type == TT_GTE)
      result = left.get_comparison_gte(right)
    else if (node.op_tok.matches(TT_KEYWORD, 'AND'))
      result = left.anded_by(right)
    else if (node.op_tok.matches(TT_KEYWORD, 'OR'))
      result = left.ored_by(right)
    if (!result)
      throw new Error("Error while processing result")
    else
      return res.success(result.set_pos(node.pos_start,node.pos_end));
  }


  visit_UnaryOpNode(node: any, context: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    var res = new RTResult()
    var number = res.register(_this.visit(node.node, context))
    if (res.should_return()) { return res; }
    if (node.op_tok.type == TT_MINUS)
      number = number.multed_by(Number(-1))
    else if (node.op_tok.matches(TT_KEYWORD, 'NOT'))
      number = number.notted()
    return res.success(number.set_pos(node.pos_start, node.pos_end))
  }

  visit_CallNode(node: any, context: any, _this: any) {
    if (!_this) {
      _this = this;
    }
    var res = new RTResult()
    var args = []
    var value_to_call = res.register(_this.visit(node.node_to_call, context))
    if (res.should_return()) return res;
    value_to_call = value_to_call.copy().set_pos(node.pos_start, node.pos_end)
    for (var key in node.arg_nodes) {
      var arg_node = node.arg_nodes[key];
      args.push(res.register(_this.visit(arg_node, context)))
      if (res.should_return()) return res;
    }
    var return_value = res.register(value_to_call.execute(args))
    if (res.should_return()) return res;
    return_value = return_value.copy().set_pos(node.pos_start, node.pos_end).set_context(context)
    return res.success(return_value)
  }

  visit_ReturnNode(node: any, context: any, _this: any) {
    if (!_this) {
      _this = this;
    }
    var res = new RTResult();
    if (node.node_to_return) {
      var value = res.register(_this.visit(node.node_to_return, context))
      return res.success_return(value)
    }
    else {
      value = BNumber.null
      return res.success_return(value)
    }
  }

  visit_ContinueNode(node: any, context: any) {

    return new RTResult().success_continue()
  }

  visit_BreakNode(node: any, context: any) {
    return new RTResult().success_break()
  }

  visit_ForNode(node: any, context: any, _this: any) {
    if (!_this) {
      _this = this;
    }
    var res = new RTResult()
    var elements = []
    var self = _this;
    var start_value = res.register(self.visit(node.start_value_node, context))
    if (res.should_return()) return res
    var end_value = res.register(self.visit(node.end_value_node, context))
    if (res.should_return()) return res
    if (node.step_value_node) {
      var step_value = res.register(self.visit(node.step_value_node, context))
      if (res.should_return()) return res;
    }
    else {
      step_value = Number(1)
    }
    var i = start_value.value

    if (step_value.value >= 0) {
      var condition = () => i < end_value.value
    }

    else {
      condition = () => i > end_value.value
    }

    while (condition()) {
      context.symbol_table.set(node.var_name_tok.value, Number(i))
      i += step_value.value

      var value = res.register(self.visit(node.body_node, context))
      if (res.should_return() && res.loop_should_continue == false &&
        res.loop_should_break == false) { return res; }
      if (res.loop_should_continue) {
        continue
      }
      if (res.loop_should_break)
        break
      elements.push(value)
    }

    if (node.should_return_null) {
      return res.success(BNumber.null)
    } else {
      return res.success(new List(elements).set_context(context).set_pos(node.pos_start, node.pos_end))
    }
  }


  visit_WhileNode(node: any, context: any, _this: any) {
    if (!_this) {
      _this = this;
    }
    var res = new RTResult()
    var elements = [];
    var self = _this;
    while (true) {
      var condition = res.register(self.visit(node.condition_node, context))
      if (res.should_return()) return res

      if (!condition.is_true())
        break

      var value = res.register(self.visit(node.body_node, context))
      if (res.should_return() && res.loop_should_continue == false
        && res.loop_should_break == false) return res

      if (res.loop_should_continue)
        continue

      if (res.loop_should_break)
        break

      elements.push(value)
    }

    if (node.should_return_null) {
      return res.success(BNumber.null);
    } else {
      res.success(new List(elements)
        .set_context(context).set_pos(node.pos_start, node.pos_end));
    }


  }



  visit_FuncDefNode(node: any, context: any) {
    var res = new RTResult();
    var func_name = undefined;
    if (node.var_name_tok) {
      func_name = node.var_name_tok
    } else {
      func_name = null;
    }
    var body_node = node.body_node
    var arg_names = node.arg_name_toks.map((x: any) => x.value);
    var func_value = new Function(func_name, body_node, arg_names, node.should_auto_return)
      .set_context(context).set_pos(node.pos_start, node.pos_end)
    if (node.var_name_tok)
      context.symbol_table.set(func_name, func_value)
    return res.success(func_value)
  }


  visit_IfNode(node:any, context:any,self:any)  
  {
    if(!self)
    {
      self = this;
    }
    var res = new RTResult()
      node.cases.forEach(function(current:any){
        var condition = current[0];
        var expr = current[1];
        var should_return_null = current[2];
        var condition_value = res.register(self.visit(condition, context))
        if(res.should_return()){ return res; }
        if (condition_value.is_true())
        {
          var expr_value = res.register(self.visit(expr, context))
          if (res.should_return()) {return res;}
          if(should_return_null)
          {
            res.success(BNumber.null)
          }else {
            res.success(expr_value)
          }
        }
      });
    if(node.else_case)
    {
      var expr = node.else_case[0];
      var should_return_null = node.else_case[1];
      var expr_value = res.register(self.visit(expr, context))
      if (res.should_return()){ return res; }
      if(should_return_null)
      {
        res.success(BNumber.null)
      }else {
        res.success(expr_value)
      }
    }
    return res.success(BNumber.null)
  }

}




