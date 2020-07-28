# BASIC-JS-Interpreter
BASIC-JS-Interpretor is a Basic to Javascript Interpretor can be used in FORMULA parsing.
  - Written in Typescript
  - Runs on Netsuite's Rhino
  - Amd Module support
  - Supports MultiLine Script Parsing
  - Supports Function
  - Supports Loop statements
  - Advanced syntax validator

# New Features!

  - Netusite Suitescript 2.0 Import support added
  - greater than less than syntax error has been fixed
  - Runs on Netsuite's Rhino Chrome Firefox


### Tech

Basic-JS uses a number of open source projects to work properly:

* [Typescript](https://www.typescriptlang.org/) - A Superset of javascript
* [VisualStudio Code](https://code.visualstudio.com/) - awesome windows-based text editor and light ide


### Installation

Basic-Js requires [Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) to run.

[Netsuite]
Copy the dist scripts to FileCabinet
and in Scripts
```sh
require(["./basic"],function(interpretor){
  var basic = new interpreter.basic();
  var result = basic.run("test","2+3");
  log.debug("output",result.value.elements);
})
```
[Browser]
Reference [Require](https://requirejs.org/) for loading the modules.
Copy the dist scripts to root directory of the application 
and in html file
```sh
require(["./basic"],function(interpreter){
  var basic = new interpreter.basic();
  var result = basic.run("test","2+3");
  console.log("output",result.value.elements);
})
```

## Language Grammer
```
statements  : NEWLINE* statement (NEWLINE+ statement)* NEWLINE*

statement		: KEYWORD:RETURN expr?
						: KEYWORD:CONTINUE
						: KEYWORD:BREAK
						: expr

expr        : KEYWORD:VAR IDENTIFIER EQ expr
            : comp-expr ((KEYWORD:AND|KEYWORD:OR) comp-expr)*

comp-expr   : NOT comp-expr
            : arith-expr ((EE|LT|GT|LTE|GTE) arith-expr)*

arith-expr  :	term ((PLUS|MINUS) term)*

term        : factor ((MUL|DIV) factor)*

factor      : (PLUS|MINUS) factor
            : power

power       : call (POW factor)*

call        : atom (LPAREN (expr (COMMA expr)*)? RPAREN)?

atom        : INT|FLOAT|STRING|IDENTIFIER
            : LPAREN expr RPAREN
            : list-expr
            : if-expr
            : for-expr
            : while-expr
            : func-def

list-expr   : LSQUARE (expr (COMMA expr)*)? RSQUARE

if-expr     : KEYWORD:IF expr KEYWORD:THEN
              (statement if-expr-b|if-expr-c?)
            | (NEWLINE statements KEYWORD:END|if-expr-b|if-expr-c)

if-expr-b   : KEYWORD:ELIF expr KEYWORD:THEN
              (statement if-expr-b|if-expr-c?)
            | (NEWLINE statements KEYWORD:END|if-expr-b|if-expr-c)

if-expr-c   : KEYWORD:ELSE
              statement
            | (NEWLINE statements KEYWORD:END)

for-expr    : KEYWORD:FOR IDENTIFIER EQ expr KEYWORD:TO expr 
              (KEYWORD:STEP expr)? KEYWORD:THEN
              statement
            | (NEWLINE statements KEYWORD:END)

while-expr  : KEYWORD:WHILE expr KEYWORD:THEN
              statement
            | (NEWLINE statements KEYWORD:END)

func-def    : KEYWORD:FUN IDENTIFIER?
              LPAREN (IDENTIFIER (COMMA IDENTIFIER)*)? RPAREN
              (ARROW expr)
            | (NEWLINE statements KEYWORD:END)

```

### Development

Want to contribute? Great!
Basic-js uses Typescript and VisualStudio Code for fast developing.

Want to Know more? 
Great I suggest you the following books and references to know more about compilers and interpreters
  - Principles Of Compiler Design
  - TypeScript Design Patterns

Open your favorite Terminal and run these commands.

#### Building for source
For production release please change the tsconfig file according to your need:
```sh
tsc
```


### Todos

 - Write Tests
 - Add comments

License
----

MIT

### Credits
This is typescript version of Basic PROGRAMMING Language inspired from codepulse work

- Principles Of Compiler Design
   - ISBN-13: 978-8185015613


