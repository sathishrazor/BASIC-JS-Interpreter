define(["require", "exports", "./core/position", "./error/illegal_char_error", "./others/keywords", "./error/expected_char_error", "./others/tokens"], function (require, exports, position_1, illegal_char_error_1, keywords_1, expected_char_error_1, tokens_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Lexer = /** @class */ (function () {
        function Lexer(fn, text) {
            this.fn = fn;
            this.text = text;
            this.pos = new position_1.LPosition(-1, 0, -1, fn, text);
            this.current_char = "";
            this.advance();
        }
        Lexer.prototype.advance = function () {
            this.pos.advance(this.current_char);
            if (this.pos.idx < this.text.length) {
                this.current_char = this.text[this.pos.idx];
            }
            else {
                this.current_char = "";
            }
        };
        Lexer.prototype.make_tokens = function () {
            var tokens = [];
            var self = this;
            while (self.current_char != "") {
                var tab_str = " \t";
                var nline_str = ";\n";
                if (tab_str.indexOf(self.current_char) > -1) {
                    self.advance();
                }
                else if (self.current_char == "#") {
                    self.skip_comment();
                }
                else if (nline_str.indexOf(self.current_char) > -1) {
                    tokens.push(new tokens_1.Token(TT_NEWLINE, null, self.pos));
                    self.advance();
                }
                else if (DIGITS.indexOf(self.current_char) > -1) {
                    tokens.push(self.make_number());
                }
                else if (LETTERS.indexOf(self.current_char) > -1) {
                    tokens.push(self.make_identifier());
                }
                else if (self.current_char == '"') {
                    tokens.push(self.make_string());
                }
                else if (self.current_char == "+") {
                    tokens.push(new tokens_1.Token(TT_PLUS, null, self.pos));
                    self.advance();
                }
                else if (self.current_char == "-") {
                    tokens.push(self.make_minus_or_arrow());
                }
                else if (self.current_char == "*") {
                    tokens.push(new tokens_1.Token(TT_MUL, null, self.pos));
                    self.advance();
                }
                else if (self.current_char == "/") {
                    tokens.push(new tokens_1.Token(TT_DIV, null, self.pos));
                    self.advance();
                }
                else if (self.current_char == "^") {
                    tokens.push(new tokens_1.Token(TT_POW, null, self.pos));
                    self.advance();
                }
                else if (self.current_char == "(") {
                    tokens.push(new tokens_1.Token(TT_LPAREN, null, self.pos));
                    self.advance();
                }
                else if (self.current_char == ")") {
                    tokens.push(new tokens_1.Token(TT_RPAREN, null, self.pos));
                    self.advance();
                }
                else if (self.current_char == "[") {
                    tokens.push(new tokens_1.Token(TT_LSQUARE, null, self.pos));
                    self.advance();
                }
                else if (self.current_char == "]") {
                    tokens.push(new tokens_1.Token(TT_RSQUARE, null, self.pos));
                    self.advance();
                }
                else if (self.current_char == "!") {
                    var token = self.make_not_equals();
                    tokens.push(token);
                }
                else if (self.current_char == "=") {
                    tokens.push(self.make_equals());
                }
                else if (self.current_char == "<") {
                    tokens.push(self.make_less_than());
                }
                else if (self.current_char == ">") {
                    tokens.push(self.make_greater_than());
                }
                else if (self.current_char == ",") {
                    tokens.push(new tokens_1.Token(TT_COMMA, null, self.pos));
                    self.advance();
                }
                else {
                    var pos_start = self.pos.copy();
                    var char = self.current_char;
                    self.advance();
                    throw new illegal_char_error_1.IllegalCharError(pos_start, self.pos, "'" + char + "'");
                }
            }
            tokens.push(new tokens_1.Token(TT_EOF, null, (pos_start = self.pos)));
            return tokens;
        };
        Lexer.prototype.make_number = function () {
            var self = this;
            var num_str = "";
            var dot_count = 0;
            var pos_start = self.pos.copy();
            while (self.current_char != "" &&
                (DIGITS + ".").indexOf(self.current_char) > -1) {
                if (self.current_char == ".") {
                    if (dot_count == 1) {
                        break;
                    }
                    dot_count += 1;
                }
                num_str += self.current_char;
                self.advance();
            }
            if (dot_count == 0) {
                return new tokens_1.Token(TT_INT, parseInt(num_str), pos_start, self.pos);
            }
            else {
                return new tokens_1.Token(TT_FLOAT, parseFloat(num_str), pos_start, self.pos);
            }
        };
        Lexer.prototype.make_string = function () {
            var self = this;
            var string = "";
            var pos_start = self.pos.copy();
            var escape_character = false;
            self.advance();
            var escape_characters = {
                n: "\n",
                t: "\t"
            };
            while (self.current_char != "" &&
                (self.current_char != '"' || escape_character)) {
                if (escape_character) {
                    string += escape_characters[self.current_char] || self.current_char;
                }
                else {
                    if (self.current_char == "\\") {
                        escape_character = true;
                    }
                    else {
                        string += self.current_char;
                    }
                }
                self.advance();
                escape_character = false;
            }
            self.advance();
            return new tokens_1.Token(TT_STRING, string, pos_start, self.pos);
        };
        Lexer.prototype.make_identifier = function () {
            var self = this;
            var id_str = "";
            var pos_start = self.pos.copy();
            while (self.current_char != "" &&
                ((LETTERS_DIGITS + "_").indexOf(self.current_char) > -1)) {
                id_str += self.current_char;
                self.advance();
            }
            var tok_type;
            if (keywords_1.LANG_KEYWORDS.indexOf(id_str) > -1) {
                tok_type = TT_KEYWORD;
            }
            else {
                tok_type = TT_IDENTIFIER;
            }
            return new tokens_1.Token(tok_type, id_str, pos_start, self.pos);
        };
        Lexer.prototype.make_minus_or_arrow = function () {
            var self = this;
            var tok_type = TT_MINUS;
            var pos_start = self.pos.copy();
            self.advance();
            if (self.current_char == ">") {
                self.advance();
                tok_type = TT_ARROW;
            }
            return new tokens_1.Token(tok_type, null, pos_start, self.pos);
        };
        Lexer.prototype.make_not_equals = function () {
            var self = this;
            var pos_start = self.pos.copy();
            self.advance();
            if (self.current_char == "=") {
                self.advance();
                return new tokens_1.Token(TT_NE, null, pos_start, self.pos);
            }
            else {
                self.advance();
                throw new expected_char_error_1.ExpectedCharError(pos_start, self.pos, "'=' (after '!')");
            }
        };
        Lexer.prototype.make_equals = function () {
            var self = this;
            var tok_type = TT_EQ;
            var pos_start = self.pos.copy();
            self.advance();
            if (self.current_char == "=") {
                self.advance();
                tok_type = TT_EE;
            }
            return new tokens_1.Token(tok_type, null, pos_start, self.pos);
        };
        Lexer.prototype.make_less_than = function () {
            var self = this;
            var tok_type = TT_LT;
            var pos_start = self.pos.copy();
            self.advance();
            if (self.current_char == "=") {
                self.advance();
                tok_type = TT_LTE;
            }
            return new tokens_1.Token(tok_type, null, pos_start, self.pos);
        };
        Lexer.prototype.make_greater_than = function () {
            var self = this;
            var tok_type = TT_GT;
            var pos_start = self.pos.copy();
            self.advance();
            if (self.current_char == "=") {
                self.advance();
                tok_type = TT_GTE;
            }
            return new tokens_1.Token(tok_type, null, pos_start, self.pos);
        };
        Lexer.prototype.skip_comment = function () {
            var self = this;
            self.advance();
            while (self.current_char != "\n") {
                self.advance();
            }
        };
        return Lexer;
    }());
    exports.Lexer = Lexer;
});
