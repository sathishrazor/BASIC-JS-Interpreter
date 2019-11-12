export class SymbolTable {
    parent: SymbolTable;
    symbols: any;
    constructor(parent: any = null) {
        this.symbols = {}
        this.parent = parent
    }

    get(name: any): SymbolTable {
        var value = this.symbols.get(name, null)
        if (value == null && self.parent) {
            return this.parent.get(name)
        }
        return value
    }
    set(name: string, value: any) {
        this.symbols[name] = value
    }
    remove(name: string) {
        delete this.symbols[name]
    }
}

