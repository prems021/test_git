export interface Hero {
    DESCRIPTION: string;
    HSN_CODE: string;
    AVAIL_QTY : number;
    NET_PRICE : number;
    CATGERY : string;
  }

  export interface Cus_vendor {
    ID :  number,
    NAME: string,
    GSTIN: string,
    STREET: string,
    CITY: string,
    PH: number,
    TYPE_: string,
    MODE_: number,
    OP_BAL: number,
    CRED_BAL: number,
    COM_ID: number
  }
  
  

  export interface Zero {

    id: number;
    USER_NAME: string;
    PASSWORD : string;
 
  }


  export interface Msg_param {

    type: string;
    contact_no: string;
    msg : string;
    authorization : string;
  }
  

 
  

  export class invoice_master {
    constructor(
    
    public  heads:invoice_head,
    public  items:invoice_items[],
    public  varibs:invoice_varibs,
    public  tails:invoice_tails,
    public  com_dets:company_dets
    
  
  
    ) {} }

    export class invoice_varibs {
      constructor(
      
      public  i:number,
      public  k:number,
    
      
    
    
      ) {} }

    


    export class invoice_items
    {
      constructor(
     public SI_NO : number,
     public NAME : string,
     public PRO_ID: number,
     public MRP: number,
     public QTY: number,
     public UNIT: string,
     public PRICE: number,
     public NET_PRICE : number,
     public NET_VALUE : number,
     public BAR_CODE:string,
     public ENTRY_NO: number,
     public TAX : number,
     public ENTRY_DATE : string,
     public MODE_ : string,
     public CUS_ID : number
     

      ) {}
    
    }

  export class invoice_head {
    constructor(
      public COM_ID : string,
      public SESSION_ID : string,
      public INVOICE_DATE : Date,
      public INVOICE_NUMBER : number,
      public CUS_NAME : string,
      public CUS_ID : number,
      public CUS_ADDRESS : string,
      public CUS_CITY : string,
      public CUS_MOB : string,
      public CUS_GST_NO : string,   
      public SUB_TOTAL : number,
      public YOUSAVE_TOTAL : number,
      public MRP_TOTAL : number,   
      public GRAND_TOTAL : number,
      public CESS_AMT : number,
      public PAYED_AMT : number,
      public RECIEVED_AMT : number,
      public BAL_PAY : number,
      public BILL_DUE : number,
      public BILL_ROUND_OFF : number,
      public STATUS_FLAG : number,
      public MODE_ : string,
      public TYPE_ : string,
      public PRE_RECIVED_AMT : number,
      public POS : string,
      public LPO : string,
      public BUNDLES : string,
      public MOS : string

  

    ) {}
  
  }

  export class invoice_tails {
    constructor(

   public SUB_TOTAL : number,
   public YOUSAVE_TOTAL : number,
   public MRP_TOTAL : number,   
   public GRAND_TOTAL : number,
   public PAYED_TODAY : number,
   public BAL_PAY : number,
   public BILL_DUE : number
   

    ) 
    {}
  
  }



  export interface invoice_slave {
    DESCRIPTION: string;
    HSN_CODE: string;
    AVAIL_QTY : number;
    NET_PRICE : number;
    CATGERY : string;
    POSTED_BY : string;
    INVOICE_NUMBER : number;
    INVOICE_STRING : string;
  }



  export class items_tax {
    constructor(
      
           public si : number ,
           public item : sublist[],
          
         
        
      
    ) {  }
  }
  
  
  export class sublist 
  {
   constructor(
  public SI : number,  
  public QUANTITY : number, 
  public TAX : number,
  public NET_PRICE : number,
  public NET_VALUE : number,
  public CGST : number,
  public SGST : number,
  public KFC : number,
  public PRICE :number


  
    ) {  }
  }
  

  export class figure {
    constructor(
    
   public number_to_convert: number,
   public fraction : number,  
   public  msg: string
   
    
  
  
    ) {} }

    export class company_dets {
      constructor(
        public company_address_1: string,
        public company_address_2: string,
        public company_email: string,
        public company_gstin: string,
        public company_name: string,
        public company_ph_1: string,
        public company_ph_2: string,
        public company_street: string,
        public createdAt: string,
        public id: number,
        public updatedAt: string
      ) {} }

  