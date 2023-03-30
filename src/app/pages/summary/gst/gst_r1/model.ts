


    export class invoice_list
    {
      constructor(
     public bundles : string,
     public cast : number,
     public com_id: number,
     public counter_no: number,
     public createdAt: string,
     public cus_id: number,
     public deletedAt: string,
     public discount_amt: number,
     public fy_id: number,
     public grand_amt: number,
     public hb7_customer: hbs_c[],
     public hb7_invoice_details: hb7_invoice_det[],
     public id: number,
     public invoice_date: string,
     public invoice_no: number,
     public invoice_no_pur: string,
     public lpo_no: string,
     public mode: string,
     public mode_of_supply: string,
     public pos: string,
     public ref_invoice_date: string,
     public ref_invoice_number: string,
     public round_off: number,
     public status: number,
     public type: string,
     public updatedAt: string,
     public user_id: number
    

      ) {}
    
    }

    export class hbs_c
    {
      constructor(
  
       public address_1: string,
       public address_2: string,
       public cast: number,
       public com_id: 1,
       public createdAt: string,
       public credit_balance: number,
       public email: string,
       public gst_in: string,
       public id: number,
       public mob: number,
       public name: string,
       public opening_balance: number,
       public ph: string,
       public street: string,
       public type: number,
       public updatedAt: string,
  
     ) {}
    
    }

    export class hb7_invoice_det
    {
      constructor(
        public Hb7_product : product[],     
        public batch_id: string,
        public createdAt: string,
        public deletedAt: string,
        public discount: number,
        public free_qty: number,
        public id: number,
        public index_no: number,
        public master_id: number,
        public mrp: number,
        public product_description:string,
        public product_id: number,
        public qty: number,
        public rate: number,
        public tax: number,
        public updatedAt : string
  
     ) {}
    
    }
    
    export class product
    {
      constructor(

        public  bar_code:  string,
        public batch_id:  string,
        public category_id: number,
        public com_id: number,
        public createdAt: string,
        public hsn_code: string,
        public id: number,
        public mrp: number,
        public opening_stock: number,
        public product_description: string,
        public product_name: string,
        public rate: number,
        public tax_rate: number,
        public unit_id: number,
        public updatedAt: string
  
     ) {}
    
    }



    export class process_list
    {
      constructor(
     public id : number,   
     public Receiver_Name : string,
     public Invoice_Number : string,
     public GSTIN_of_Recipient : string,
     public Name_of_Recipient : string,
     public Invoice_date : string,
     public Invoice_Value : number,
     public Place_Of_Supply : string,
     public Reverse_Charge : string,
     public Applicable_percent_of_Tax_Rate : number,
     public Invoice_Type : string,
     public E_Commerce_GSTIN : string,
     public Rate : number,
     public Taxable_Value : number,     
     public Cess_Amount : number,
     public Igst_amt : number,
     public Cgst_amt : number,
     public Sgst_amt : number

     ) {}
    
    }



    export class b2cs_summary_list
    {
      constructor(
     public id : number,  
     public mode : string,  
     public Invoice_Type : string,
     public Place_Of_Supply : string,
     public Applicable_percent_of_Tax_Rate : number,
     public Rate : number,
     public Taxable_Value : number,     
     public Cess_Amount : number,
     public gst_amt : number,
     public Cgst_amt : number,
     public Sgst_amt : number    

     ) {}
    
    }


    export class hsn_list
    {
      constructor(
     public si_no : number,
     public id : number,  
     public hsn_code : number,  
     public product_name : string, 
     public unit_code : string,
     public total_Qty : number,
     public total_Value : number,
     public total_taxable_Value : number,  
     public rate : number,  
     public Igst : number,
     public Sgst : number,
     public Cgst : number,
     public Cess : number,
    
     ) {}
    
    }