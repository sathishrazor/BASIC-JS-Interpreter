import {RTError} from "./error/RT_error"
import {Value} from "./Value"
export class BNumber extends Value {
    value: any;
   
    static false: BNumber;
    static true: BNumber;
    static math_PI: BNumber;
    static null: BNumber;

    constructor(value: any) {
        super();
        this.value = value
    }

   added_to(other:any) {
        if (other instanceof BNumber) {
            return new BNumber(this.value + other.value).set_context(this.context)
        }
        else {
            return this.illegal_operation( other)
        }
    }

    subbed_by(other: any) {
        if (other instanceof BNumber) {
            return new BNumber(this.value - other.value).set_context(this.context);
        }
        else {
            return this.illegal_operation( other)
        }
    }

    multed_by(other: any) {

        if (other instanceof BNumber) {
            return new BNumber(this.value * other.value).set_context(this.context);
        }
        else {
            return this.illegal_operation(other)
        }
    }

    dived_by(other: any) {
        if(other instanceof BNumber)
        {
            if (other.value == 0) {
                return new RTError(other.pos_start, other.pos_end, 'Division by zero', this.context)
            }
            return new BNumber(this.value / other.value).set_context(this.context)
        }
        else {
            return this.illegal_operation( other)
        }
    }

    powed_by(other:any) {
        if (other instanceof BNumber)
        {
            return new BNumber(this.value ** other.value).set_context(this.context)
        }
        else
        {
            return  this.illegal_operation( other)
        }
    }

     get_comparison_eq(other:any)
    {
        if(other instanceof BNumber)
        {
            var temp = this.value == other.value?1:0;
            return new BNumber(temp).set_context(this.context)
        }
      else
      {
        return this.illegal_operation(other);
      }
       
    }


    get_comparison_ne(other:any)
    {
        if (other instanceof BNumber)
        {
            var temp = this.value != other.value ?1:0
            return new BNumber(temp).set_context(this.context);
        }
       else
       {
        return this.illegal_operation( other)
       }
    }
  

    get_comparison_lt(other:any){
    if (other instanceof BNumber){
        var temp = this.value < other.value?1:0;
      return new BNumber(temp).set_context(this.context);
    }
      else{
      return this.illegal_operation(other);
      }
    }

   get_comparison_gt(other:any)
   {
    if (other instanceof BNumber)
    {
        var temp = this.value > other.value ?1:0;
        return new BNumber(temp).set_context(this.context);
    }
    else {
      return this.illegal_operation( other);
    }

    }

   get_comparison_lte(other:any){
    if (other instanceof BNumber)
    {
        var temp = this.value <= other.value ?1:0;
        return new BNumber(temp).set_context(this.context);
    }       
    else
      return  this.illegal_operation( other)
   }

   get_comparison_gte(other:any){
    if(other instanceof BNumber){
        var temp  = this.value >= other.value ?1:0
        return new BNumber(temp).set_context(this.context);
    }
    else
      return  this.illegal_operation( other)
   }

   anded_by(other:any){
    if (other instanceof BNumber)
    {
     var temp = this.value && other.value?1:0;        
      return new BNumber(temp).set_context(this.context);
    }
    else
      return  this.illegal_operation( other)
   }

   ored_by(other:any){
    if (other instanceof BNumber)
        {
            var temp = this.value || other.value ?1:0;
            return new BNumber(temp).set_context(this.context)    
        }
    else
      return this.illegal_operation( other)
   }

   notted(){
    var temp =  this.value == 0?1:0;
    return new BNumber(temp).set_context(this.context)
   }

   copy(){
   var copy = new BNumber(this.value)
    copy.set_pos(this.pos_start, this.pos_end)
    copy.set_context(this.context)
    return copy;
   }
   
      is_true()
    {
        return this.value != 0
    }

    toString()
    {
        return this.value;
    }
}

BNumber.null = new BNumber(0)
BNumber.false = new  BNumber(0)
BNumber.true = new BNumber(1)
BNumber.math_PI = new BNumber(Math.PI)