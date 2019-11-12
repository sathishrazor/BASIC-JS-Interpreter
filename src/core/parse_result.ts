export class ParseResult
{
    error: any;
    node: any;
    last_registered_advance_count: number;
    advance_count: number;
    to_reverse_count: number;
    constructor()
    {
    this.error = null
    this.node = null
    this.last_registered_advance_count = 0
    this.advance_count = 0
    this.to_reverse_count = 0
    }

  register_advancement()
  {
    this.last_registered_advance_count = 1
    this.advance_count += 1
  }
    

  register(res:any)
  {
    this.last_registered_advance_count = res.advance_count
    this.advance_count += res.advance_count
    if (res.error){
        this.error = res.error
    }
    return res.node
  }
  

  try_register(res:any)
  {
    if(res.error)
    {
        this.to_reverse_count = res.advance_count
        return null;
    }    
    return this.register(res)
  }
   

  success(node:any)
  {
    this.node = node
    return this
  }
   

  failure( error:any)
  {
    if(!this.error || this.last_registered_advance_count == 0) 
    {
        this.error = error
    }
   
  return this
  }
}
    