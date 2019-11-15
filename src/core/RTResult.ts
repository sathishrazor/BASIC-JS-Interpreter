import { CodeError } from "../error/code_error";
import { Value } from "../others/Value";

export class RTResult {
    value: any;
    error: any;
    func_return_value: any;
    loop_should_continue: any;
    loop_should_break: any;
    constructor() {
        this.reset()
    }

    reset(_this?:this) {
        if(!_this)
        {
            _this = this;
        }
        _this.value = null
        _this.error = null
        _this.func_return_value = null
        _this.loop_should_continue = false
        _this.loop_should_break = false
    }


    register(res: any,_this?:this) {
        if(!_this)
        {
            _this = this;
        }
        _this.error = res.error
        _this.func_return_value = res.func_return_value
        _this.loop_should_continue = res.loop_should_continue
        _this.loop_should_break = res.loop_should_break
        return res.value
    }


    success(value: any,_this?:this) {
        if(!_this)
        {
            _this = this;
        }
        _this.reset()
        _this.value = value
        return _this;

    }

    success_return(value: any,_this?:this) {
        if(!_this)
        {
            _this = this;
        }
        _this.reset()
        _this.func_return_value = value
        _this.value = value;
        return _this;
    }

    success_continue(_this?:this) {
        if(!_this)
        {
            _this = this;
        }
        _this.reset()
        _this.loop_should_continue = true
        return _this
    }

    success_break(_this?:this) {
        if(!_this)
        {
            _this = this;
        }
        _this.reset()
        _this.loop_should_break = true
        return _this
    }

    failure(error: CodeError,_this?:this) {
        if(!_this)
        {
            _this = this;
        }
        _this.reset()
        _this.error = error
        return _this
    }

    should_return() {
        
        if(this.func_return_value)
        {
            return true;
        }
        
        if(this.loop_should_continue)
        {
            return true;
        }
        
        if(this.loop_should_break)
        {
            return true;
        }

        if(this.error)
        {
            return true ;
        }      
        return false;
    
    }

}