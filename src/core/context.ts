export class Context {
    display_name: string;
    parent: any;
    parent_entry_pos: any;
    symbol_table: any;
    constructor(display_name: string, parent: any = null, parent_entry_pos: any = null) {
        this.display_name = display_name
        this.parent = parent
        this.parent_entry_pos = parent_entry_pos
        this.symbol_table = null
    }
}
