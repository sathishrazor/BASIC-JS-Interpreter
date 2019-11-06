define(["require", "exports", "./RTResult", "./number", "./string", "./list", "./error/RT_error", "./function"], function (require, exports, RTResult_1, number_1, string_1, list_1, RT_error_1, function_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Interpreter = /** @class */ (function () {
        function Interpreter() {
        }
        Interpreter.prototype.visit = function (node, context) {
            var method_name = 'visit_{type(node).__name__}';
            var method = this.getmethod(this, method_name);
            return method(node, context);
        };
        Interpreter.prototype.getmethod = function (ctx, name) {
            return ctx[name];
        };
        Interpreter.prototype.no_visit_method = function (node, context) {
            throw new Error('No visit_{type(node).__name__} method defined');
        };
        Interpreter.prototype.visit_NumberNode = function (node, context) {
            return new RTResult_1.RTResult().success(new number_1.BNumber(node.tok.value)
                .set_context(context)
                .set_pos(node.pos_start, node.pos_end));
        };
        Interpreter.prototype.visit_BStringNode = function (node, context) {
            return new RTResult_1.RTResult().success(new string_1.BString(node.tok.value)
                .set_context(context)
                .set_pos(node.pos_start, node.pos_end));
        };
        Interpreter.prototype.visit_ListNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var elements = [];
            var self = this;
            node.element_nodes.forEach(function (c, i, a) {
                elements.push(res.register(self.visit(c, context)));
                if (res.should_return()) {
                    return res;
                }
            });
            return res.success(new list_1.List(elements).set_context(context).set_pos(node.pos_start, node.pos_end));
        };
        Interpreter.prototype.visit_VarAccessNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var var_name = node.var_name_tok.value;
            var value = context.symbol_table.get(var_name);
            if (!value)
                return res.failure(new RT_error_1.RTError(node.pos_start, node.pos_end, var_name + "' is not defined", context));
            value = value.copy().set_pos(node.pos_start, node.pos_end).set_context(context);
            return res.success(value);
        };
        Interpreter.prototype.visit_VarAssignNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var var_name = node.var_name_tok.value;
            var value = res.register(this.visit(node.value_node, context));
            if (res.should_return())
                return res;
            context.symbol_table.set(var_name, value);
            return res.success(value);
        };
        Interpreter.prototype.visit_BinOpNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var left = res.register(this.visit(node.left_node, context));
            if (res.should_return())
                return res;
            var right = res.register(this.visit(node.right_node, context));
            if (res.should_return())
                return res;
            var result = undefined;
            if (node.op_tok.type == TT_PLUS)
                result = left.added_to(right);
            else if (node.op_tok.type == TT_MINUS)
                result = left.subbed_by(right);
            else if (node.op_tok.type == TT_MUL)
                result = left.multed_by(right);
            else if (node.op_tok.type == TT_DIV)
                result = left.dived_by(right);
            else if (node.op_tok.type == TT_POW)
                result = left.powed_by(right);
            else if (node.op_tok.type == TT_EE)
                result = left.get_comparison_eq(right);
            else if (node.op_tok.type == TT_NE)
                result = left.get_comparison_ne(right);
            else if (node.op_tok.type == TT_LT)
                result = left.get_comparison_lt(right);
            else if (node.op_tok.type == TT_GT)
                result = left.get_comparison_gt(right);
            else if (node.op_tok.type == TT_LTE)
                result = left.get_comparison_lte(right);
            else if (node.op_tok.type == TT_GTE)
                result = left.get_comparison_gte(right);
            else if (node.op_tok.matches(TT_KEYWORD, 'AND'))
                result = left.anded_by(right);
            else if (node.op_tok.matches(TT_KEYWORD, 'OR'))
                result = left.ored_by(right);
            if (!result)
                throw new Error("Error while processing result");
            else
                return res.success(result.set_pos(node.pos_start, node.pos_end));
        };
        Interpreter.prototype.visit_UnaryOpNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var number = res.register(this.visit(node.node, context));
            if (res.should_return()) {
                return res;
            }
            if (node.op_tok.type == TT_MINUS)
                number = number.multed_by(Number(-1));
            else if (node.op_tok.matches(TT_KEYWORD, 'NOT'))
                number = number.notted();
            return res.success(number.set_pos(node.pos_start, node.pos_end));
        };
        Interpreter.prototype.visit_CallNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var args = [];
            var value_to_call = res.register(this.visit(node.node_to_call, context));
            if (res.should_return())
                return res;
            value_to_call = value_to_call.copy().set_pos(node.pos_start, node.pos_end);
            for (var key in node.arg_nodes) {
                var arg_node = node.arg_nodes[key];
                args.push(res.register(this.visit(arg_node, context)));
                if (res.should_return())
                    return res;
            }
            var return_value = res.register(value_to_call.execute(args));
            if (res.should_return())
                return res;
            return_value = return_value.copy().set_pos(node.pos_start, node.pos_end).set_context(context);
            return res.success(return_value);
        };
        Interpreter.prototype.visit_ReturnNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            if (node.node_to_return) {
                var value = res.register(this.visit(node.node_to_return, context));
                if (res.should_return())
                    return res;
            }
            else {
                value = number_1.BNumber.null;
                return res.success_return(value);
            }
        };
        Interpreter.prototype.visit_ContinueNode = function (node, context) {
            return new RTResult_1.RTResult().success_continue();
        };
        Interpreter.prototype.visit_BreakNode = function (node, context) {
            return new RTResult_1.RTResult().success_break();
        };
        Interpreter.prototype.visit_ForNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var elements = [];
            var self = this;
            var start_value = res.register(self.visit(node.start_value_node, context));
            if (res.should_return())
                return res;
            var end_value = res.register(self.visit(node.end_value_node, context));
            if (res.should_return())
                return res;
            if (node.step_value_node) {
                var step_value = res.register(self.visit(node.step_value_node, context));
                if (res.should_return())
                    return res;
            }
            else {
                step_value = Number(1);
            }
            var i = start_value.value;
            if (step_value.value >= 0) {
                var condition = function () { return i < end_value.value; };
            }
            else {
                condition = function () { return i > end_value.value; };
            }
            while (condition()) {
                context.symbol_table.set(node.var_name_tok.value, Number(i));
                i += step_value.value;
                var value = res.register(self.visit(node.body_node, context));
                if (res.should_return() && res.loop_should_continue == false &&
                    res.loop_should_break == false) {
                    return res;
                }
                if (res.loop_should_continue) {
                    continue;
                }
                if (res.loop_should_break)
                    break;
                elements.push(value);
            }
            if (node.should_return_null) {
                return res.success(number_1.BNumber.null);
            }
            else {
                return res.success(new list_1.List(elements).set_context(context).set_pos(node.pos_start, node.pos_end));
            }
        };
        Interpreter.prototype.visit_WhileNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var elements = [];
            var self = this;
            while (true) {
                var condition = res.register(self.visit(node.condition_node, context));
                if (res.should_return())
                    return res;
                if (!condition.is_true())
                    break;
                var value = res.register(self.visit(node.body_node, context));
                if (res.should_return() && res.loop_should_continue == false
                    && res.loop_should_break == false)
                    return res;
                if (res.loop_should_continue)
                    continue;
                if (res.loop_should_break)
                    break;
                elements.push(value);
            }
            if (node.should_return_null) {
                return res.success(number_1.BNumber.null);
            }
            else {
                res.success(new list_1.List(elements)
                    .set_context(context).set_pos(node.pos_start, node.pos_end));
            }
        };
        Interpreter.prototype.visit_FuncDefNode = function (node, context) {
            var res = new RTResult_1.RTResult();
            var func_name = undefined;
            if (node.var_name_tok) {
                func_name = node.var_name_tok;
            }
            else {
                func_name = null;
            }
            var body_node = node.body_node;
            var arg_names = node.arg_name_toks.map(function (x) { return x.value; });
            var func_value = new function_1.Function(func_name, body_node, arg_names, node.should_auto_return)
                .set_context(context).set_pos(node.pos_start, node.pos_end);
            if (node.var_name_tok)
                context.symbol_table.set(func_name, func_value);
            return res.success(func_value);
        };
        return Interpreter;
    }());
    exports.Interpreter = Interpreter;
});
