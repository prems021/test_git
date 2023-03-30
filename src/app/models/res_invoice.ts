export interface Res_invoice {
  id: number;
  com_id: number;
  fy_id: number;
  cus_id: number;
  type: string;
  cast: number;
  mode: string;
  pos: string;
  lpo_no: string;
  mode_of_supply: string;
  bundles: string;
  status: number;
  user_id: number;
  counter_no: number;
  invoice_no: number;
  ref_invoice_number?: any;
  invoice_no_pur?: any;
  invoice_date: string;
  ref_invoice_date?: any;
  total_taxable: number;
  total_tax_amt: number;
  grand_amt: number;
  discount_amt: number;
  payable_amt: number;
  recieved_amt: number;
  due_amt: number;
  white_flag: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  hb7_customer: Hb7customer;
}

interface Hb7customer {
  id: number;
  com_id: number;
  gst_in: string;
  name: string;
  street: string;
  address_1: string;
  address_2: string;
  type: number;
  cast: number;
  ph: string;
  mob: string;
  email: string;
  opening_balance: number;
  credit_balance?: any;
  createdAt: string;
  updatedAt: string;
}