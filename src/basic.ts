import { BNumber } from "./others/number";
import { BuiltInFunction } from "./function/builtin_function";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { Context } from "./core/context";
import { Interpreter } from "./interpreter";
import { SymbolTable } from "./others/symbol_table";

export class basic {
    constructor()
    {
        
    }

    run(fn: any, text: string) {
        // Generate tokens
        var global_symbol_table = new SymbolTable();
        global_symbol_table.set("NULL", BNumber.null)
        global_symbol_table.set("FALSE", BNumber.false)
        global_symbol_table.set("TRUE", BNumber.true)
        global_symbol_table.set("MATH_PI", BNumber.math_PI)
        global_symbol_table.set("PRINT", BuiltInFunction.print)
        global_symbol_table.set("PRINT_RET", BuiltInFunction.print_ret)
        global_symbol_table.set("INPUT", BuiltInFunction.input)
        global_symbol_table.set("INPUT_INT", BuiltInFunction.input_int)
        global_symbol_table.set("CLEAR", BuiltInFunction.clear)
        global_symbol_table.set("CLS", BuiltInFunction.clear)
        global_symbol_table.set("IS_NUM", BuiltInFunction.is_number)
        global_symbol_table.set("IS_STR", BuiltInFunction.is_string)
        global_symbol_table.set("IS_LIST", BuiltInFunction.is_list)
        global_symbol_table.set("IS_FUN", BuiltInFunction.is_function)
        global_symbol_table.set("APPEND", BuiltInFunction.append)
        global_symbol_table.set("POP", BuiltInFunction.pop)
        global_symbol_table.set("EXTEND", BuiltInFunction.extend)
        global_symbol_table.set("LEN", BuiltInFunction.len)
        global_symbol_table.set("RUN", BuiltInFunction.run)
        
        var lexer = new Lexer(fn, text)
        console.log(lexer);
        var tokens:any = lexer.make_tokens()
        // Generate AST    
        console.log(tokens);
        var parser = new Parser(tokens);
        console.log(parser);
         var ast = parser.parse()
         console.log(ast);
        // if (ast.error) { return ast.error }

        var interpreter = new Interpreter()

        var context = new Context('<program>')

        context.symbol_table = global_symbol_table

        var result = interpreter.visit(ast.node, context)
        
        console.log(result);
        return result;
     }
}
