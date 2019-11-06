define(["require", "exports", "./number", "./builtin_function", "./lexer", "./parser", "./context", "./interpreter", "./symbol_table"], function (require, exports, number_1, builtin_function_1, lexer_1, parser_1, context_1, interpreter_1, symbol_table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var basic = /** @class */ (function () {
        function basic() {
        }
        basic.prototype.run = function (fn, text) {
            // Generate tokens
            var global_symbol_table = new symbol_table_1.SymbolTable();
            global_symbol_table.set("NULL", number_1.BNumber.null);
            global_symbol_table.set("FALSE", number_1.BNumber.false);
            global_symbol_table.set("TRUE", number_1.BNumber.true);
            global_symbol_table.set("MATH_PI", number_1.BNumber.math_PI);
            global_symbol_table.set("PRINT", builtin_function_1.BuiltInFunction.print);
            global_symbol_table.set("PRINT_RET", builtin_function_1.BuiltInFunction.print_ret);
            global_symbol_table.set("INPUT", builtin_function_1.BuiltInFunction.input);
            global_symbol_table.set("INPUT_INT", builtin_function_1.BuiltInFunction.input_int);
            global_symbol_table.set("CLEAR", builtin_function_1.BuiltInFunction.clear);
            global_symbol_table.set("CLS", builtin_function_1.BuiltInFunction.clear);
            global_symbol_table.set("IS_NUM", builtin_function_1.BuiltInFunction.is_number);
            global_symbol_table.set("IS_STR", builtin_function_1.BuiltInFunction.is_string);
            global_symbol_table.set("IS_LIST", builtin_function_1.BuiltInFunction.is_list);
            global_symbol_table.set("IS_FUN", builtin_function_1.BuiltInFunction.is_function);
            global_symbol_table.set("APPEND", builtin_function_1.BuiltInFunction.append);
            global_symbol_table.set("POP", builtin_function_1.BuiltInFunction.pop);
            global_symbol_table.set("EXTEND", builtin_function_1.BuiltInFunction.extend);
            global_symbol_table.set("LEN", builtin_function_1.BuiltInFunction.len);
            global_symbol_table.set("RUN", builtin_function_1.BuiltInFunction.run);
            var lexer = new lexer_1.Lexer(fn, text);
            console.log(lexer);
            var tokens = lexer.make_tokens();
            // Generate AST    
            console.log(tokens);
            var parser = new parser_1.Parser(tokens);
            console.log(parser);
            var ast = parser.parse();
            if (ast.error) {
                return ast.error;
            }
            var interpreter = new interpreter_1.Interpreter();
            var context = new context_1.Context('<program>');
            context.symbol_table = global_symbol_table;
            var result = interpreter.visit(ast.node, context);
            return result.value;
        };
        return basic;
    }());
    exports.basic = basic;
});
