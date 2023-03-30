


export class p_master {
    constructor(
    
    public  si:number,
    public  items:p_items[]
  
  
    
  
  
    ) {} }

    export class p_items {
      constructor(
      
      public  WHOLE_SALE_PRICE_ALT:number,
      public  WHOLE_SALE_PRICE:number,
      public  UNIT:string,
      public  RETAIL_PRICE:number,
      public  PUR_PRICE:number,
      public  PRICE:number,
      public  MRP : number,
      public ID : number,
      public DESCRIPTION : string,
      public CATGERY : string,
      public AVAIL_QTY : number,
      public SN : number
    
      
    
    
      ) {} }