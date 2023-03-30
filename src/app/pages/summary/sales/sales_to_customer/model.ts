interface RootObject {
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
  round_off: number;
  discount_amt: number;
  grand_amt: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  hb7_trans_masters: Hb7transmaster[];
}

interface Hb7transmaster {
  id: number;
  master_id: number;
  com_id: number;
  is_bulk_pay: boolean;
  serial_no: number;
  cast: string;
  type: string;
  mode: string;
  ref_no?: (null | string)[];
  status: number;
  date: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

export class report_model
{
  constructor(

 public si : number,  
 public invoice_date : string,  
 public invoice_generation_date : string, 
 public invoice_value : number,
 public total_payed : number,
 public total_pay_cycle : number,
 public total_due : number,


 ) {}

}