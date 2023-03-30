export class stock_list
{
  constructor(
 public si_no : number,
 public id : number,  
 public bar_code : string,  
 public product_name : string, 
 public unit_code : string,
 public op_bal : number,
 public pur_tot : number,
 public sales_ret_tot : number,  
 public purchase_ret_tot : number,  
 public sales_tot : number,
 public rem_count : number,


 ) {}

}




export interface Hb7product {
    id: number;
    com_id: number;
    batch_id: string;
    bar_code: string;
    hsn_code: string;
    product_name: string;
    product_description: string;
    category_id: number;
    tax_rate: number;
    mrp: number;
    rate: number;
    unit_id: number;
    opening_stock: number;
    createdAt: string;
    updatedAt: string;
    hb7_unit: Hb7unit;   
  }
  export interface Hb7unit {
    Quantity: string;
    Quantity_Type: string;
    UQC_Code: string;
    id: number;
  }
