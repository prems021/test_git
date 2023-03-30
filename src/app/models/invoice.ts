




  export interface States 
{
  state_name :string;
  state_code : string;
  alpha_code : string;
}


export interface Invoice_head 
{
    idx : number,
    com_id :number,  
    fy_id : number,
    cus_id :number,
    type : string,
    type_ex : string,
    prefix_string :string,
    cast :number,
    mode : string,  
    status   : number
    user_id : number,
    counter_no : number,
    invoice_no : number,
    invoice_no_pur : string, 
    invoice_date : string,
    total_taxable : number,
    total_tax_amt : number,
    grand_amt : number,
    round_off : number,
    discount_amt : number,
    paid_amt : number,
    mode_of_pay : number ,
    recieved_amt : number,  
    balance_amt : number,
    due_amt : number,
    white_flag : number,
    invoice_no_genrated : number,
    customer_Name : string,
    customer_Address_1 : string,
    customer_Address_2 : string,
    customer_Address_3 : string,
    customer_Gstin : string,
    customer_Ph1 : string,
    customer_Ph2 : string,
    customer_Email : string,
    pos : string,
    lpo_no : string,
    mode_of_supply : string,
    bundles : number,
    pre_cash_total : number,
    default_invo_number_type : number,
    ref_invoice_number : string ,
    ref_invoice_date : string,
    invoice_uid_genrated : number,
    invoice_created_at : Date




}

export interface Invoice_items 
{
    index_no : number,
    master_id : number
    product_id :number ,
    batch_id : number,
    rate : number,
    qty : number,
    free_qty : number,
    mrp : number,
    tax : number,
    product_name : string,
    unit : string,
    value : number,
    product_description : string,
    hsn_code : string,
    idx : number
}


export interface company_dets
  {
    company_address_1: string,
    company_address_2: string,
    company_email: string,
    company_gstin: string,
    company_name: string,
    company_ph_1: string,
    company_ph_2: string,
    company_street: string,
    company_bank_name : string,
    company_bank_ac_no : string,
    company_bank_branch_name : string,
    company_bank_ifsc_code : string,
    default_print_type : number,
    default_print_type_80mm : number,
    default_print_size : string,
    default_invo_number_type : number,
    createdAt: string,
    updatedAt: string,
    hb7_fy_strings: Hb7fystring[]
  }



interface Hb7fystring {
  id: number;
  com_id: number;
  fy_string: string;
  is_default: boolean;
}


export interface Hb_trans {
  amount: number;
  cast: string;
  createdAt: string;
  date: string;
  deletedAt: string;
  id: number;
  is_bulk_pay: boolean;
  master_id: number;
  mode: string;
  status: number;
  type: string;
  updatedAt: string;
  serial_no : number;
  ref_no :number;
}

