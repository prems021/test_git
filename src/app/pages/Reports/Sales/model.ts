


export interface RootObject {
  success: boolean;
  data: Datum[];
  msg: string;
}

interface Datum {
  id: number;
  master_id: number;
  product_id: number;
  index_no: number;
  batch_id: number;
  product_description: string;
  rate: number;
  mrp: number;
  qty: number;
  free_qty: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  hb7_invoice_master: Hb7invoicemaster;
  
  Hb7_product: Hb7product;
}

interface Hb7product {
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
  hb7_product_category: Hb7productcategory;
}

interface Hb7productcategory {
  id: number;
  com_id: number;
  category_name: string;
}

interface Hb7unit {
  id: number;
  com_id: number;
  unit: string;
}

interface Hb7invoicemaster {
  fy_id: number;
  hb7_customer : hb7_customers;
}


interface hb7_customers {
address_1: string;
address_2: string;
cast: number
com_id: number
createdAt: string
credit_balance: number
email: string
gst_in: string
id: number
mob: string
name: string
opening_balance: number
ph: string
street: string
type: number
updatedAt: string
}

export interface Items_sales 
{
Id : number,
Bar_code : string,
Hsn_code : string, 
Product_name : string,        
UQC : string,   
Quantity : number, 
Rate : number,
Customer_name : string,
Customer_id : number,
Tax_Percentage : number
}