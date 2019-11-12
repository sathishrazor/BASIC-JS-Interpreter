export class ParseResult {
  error: any;
  node: any;
  last_registered_advance_count: number;
  advance_count: number;
  to_reverse_count: number;
  constructor() {
    this.error = null
    this.node = null
    this.last_registered_advance_count = 0
    this.advance_count = 0
    this.to_reverse_count = 0
  }

  register_advancement(_this?: any) {
    if (!_this) {
      _this = this;
    }
    _this.last_registered_advance_count = 1
    _this.advance_count += 1
  }

  register(res: any, _this?: any) {
    if (!_this) {
      _this = this
    }
    _this.last_registered_advance_count = res.advance_count
    _this.advance_count += res.advance_count
    if (res.error) {
      _this.error = res.error
    }
    return res.node
  }

  try_register(res: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    if (res.error) {
      _this.to_reverse_count = res.advance_count
      return null;
    }
    return _this.register(res)
  }

  success(node: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    _this.node = node
    return _this
  }

  failure(error: any, _this?: any) {
    if (!_this) {
      _this = this;
    }
    if (!_this.error || _this.last_registered_advance_count == 0) {
      _this.error = error
    }

    return _this
  }
}
