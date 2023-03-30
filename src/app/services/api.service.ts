import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap,shareReplay } from 'rxjs/operators';
import { Customer,Assets } from './../models/customer';
import { User } from '../models/user';
import { Res_invoice } from './../models/res_invoice';
import { Invoice_head,Invoice_items,company_dets,Hb_trans,States } from '../models/invoice';
import { cdmodel } from '../models/credit-debit'
import { Msg_param } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {


 
     //  private postUrl = 'http://127.0.0.1:9001/api/post/';
     //  private cUrl = 'http://127.0.0.1:9001/api/';
     //  private adminUrl = 'http://127.0.0.1:9001/api/admin/';
   

  

    
     private postUrl = 'https://csweb.in/hb7-india-api/post/';
     private cUrl = 'https://csweb.in/hb7-india-api/';
     private adminUrl = 'https://csweb.in/hb7-india-api/admin/';
 

 

   

  
   public isMobileResolution: boolean = false;
   public api_logo_url : string;
 
  user : User
  print_size : string = 'a4';
  sub_total : number = 0;
  total_qty : number = 0;
  mrp_total : number = 0;
  invoice_id : number =0;
  floor : number = 0;
  frac : number = 0;
  figure_grand : string= '';
  state_name : string = 'Kerala';
  state_code : string = '32';

  public state_list : States[] = [
    { "state_name":"Jammu and Kashmir", "state_code":"01","alpha_code":"JK"},
    { "state_name":"Himachal Pradesh", "state_code":"02","alpha_code":"HP" },
    { "state_name":"Punjab", "state_code":"03","alpha_code":"PB"},
    { "state_name":"Chandigarh", "state_code":"04","alpha_code":"CH" },
    { "state_name":"Uttarakhand", "state_code":"05","alpha_code":"UA"},
    { "state_name":"Haryana", "state_code":"06","alpha_code":"HR" },
    { "state_name":"Delhi", "state_code":"07","alpha_code":"DL" },
    { "state_name":"Rajasthan", "state_code":"08","alpha_code":"RJ" },
    { "state_name":"Uttar Pradesh", "state_code":"09","alpha_code":"UP" },
    { "state_name":"Bihar", "state_code":"10","alpha_code":"BR" },
    { "state_name":"Sikkim", "state_code":"11","alpha_code":"SK" },
    { "state_name":"Arunachal Pradesh", "state_code":"12","alpha_code":"AR" },
    { "state_name":"Nagaland", "state_code":"13","alpha_code":"NL" },
    { "state_name":"Manipur", "state_code":"14","alpha_code":"MN" },
    { "state_name":"Mizoram", "state_code":"15","alpha_code":"MZ" },
    { "state_name":"Tripura", "state_code":"16","alpha_code":"TR" },
    { "state_name":"Meghalaya", "state_code":"17","alpha_code":"ML" },
    { "state_name":"Assam", "state_code":"18","alpha_code":"AS" },
    { "state_name":"West Bengal", "state_code":"19","alpha_code":"WB" },
    { "state_name":"Jharkhand", "state_code":"20","alpha_code":"JH" },
    { "state_name":"Odisha", "state_code":"21","alpha_code":"OR" },
    { "state_name":"Chhattisgarh", "state_code":"22","alpha_code":"CG" },
    { "state_name":"Madhya Pradesh", "state_code":"23","alpha_code":"MP" },
    { "state_name":"Gujarat", "state_code":"24","alpha_code":"GJ" },
    { "state_name":"Daman and Diu", "state_code":"25","alpha_code":"DD" },
    { "state_name":"Dadra and Nagar Haveli", "state_code":"26","alpha_code":"DN" },
    { "state_name":"Maharashtra	", "state_code":"27","alpha_code":"MH" },
    { "state_name":"Karnataka", "state_code":"29","alpha_code":"KA" },
    { "state_name":"Goa", "state_code":"30","alpha_code":"GA" },
    { "state_name":"Lakshadweep", "state_code":"31","alpha_code":"LD" },
    { "state_name":"Kerala", "state_code":"32","alpha_code":"KL"},
    { "state_name":"Tamil Nadu", "state_code":"33","alpha_code":"TN"},
    { "state_name":"Puducherry", "state_code":"34","alpha_code":"PY" },
    { "state_name":"Andaman and Nicobar Islands", "state_code":"35","alpha_code":"AN" },
    { "state_name":"Telangana", "state_code":"36","alpha_code":"TS" },
    { "state_name":"Andhra Pradesh", "state_code":"37","alpha_code":"AP"},
    { "state_name":"Ladakh", "state_code":"38","alpha_code":"LA"},
    { "state_name":"Other Territory", "state_code":"97","alpha_code":"OT" },
    { "state_name":"Centre Jurisdiction", "state_code":"99","alpha_code":"CJ" }    
  ]


  public post_demo : any = {invo_string : "",is_b2b:false,com_id:null,e_no:0,num_to_string:0}
  public Company_dets : company_dets = {
    company_address_1: '',
    company_address_2: '',
    company_email: '',
    company_gstin: '',
    company_name: '',
    company_ph_1: '',
    company_ph_2: '',
    company_street: '',
    createdAt: '',
    updatedAt: '',
    company_bank_name : '',
    company_bank_ac_no : '',
    company_bank_branch_name : '',
    company_bank_ifsc_code : '',
    default_print_type : 1,
    default_print_type_80mm : 1,
    default_print_size : 'a4',
    default_invo_number_type : 1,

    hb7_fy_strings : [{
      id: 0,
      com_id: 0,
      fy_string: '',
      is_default: true
    }]
  }

  public invo_head : Invoice_head = { idx : 0,
    com_id :0,  
    fy_id : 0,
    cus_id :0,
    type : '',
    type_ex : '',
    prefix_string : '',
    cast :0,
    mode : '',  
    status   : 0,
    user_id : 0,
    counter_no : 0,
    invoice_no : 0,
    invoice_no_pur : null,
    invoice_date : '',
    total_taxable : 0,
    total_tax_amt : 0,
    grand_amt : 0,
    round_off : 0,
    discount_amt : 0,
    paid_amt : 0,
    mode_of_pay : 1 ,
   recieved_amt : 0 ,
   balance_amt : 0 ,
   due_amt : 0 ,
   white_flag: 0 ,
   invoice_no_genrated : 0,
   customer_Name : 'Cash',
   customer_Address_1 : '',
   customer_Address_2 : '',
   customer_Address_3 : '',
   customer_Gstin : '',
   customer_Ph1 : '',
   customer_Ph2 : '',
   customer_Email : '',
   pos : '',
   lpo_no : '',
   mode_of_supply : '',
   bundles : 0,
   pre_cash_total : 0,
   default_invo_number_type : 0,
   ref_invoice_number : '',
   ref_invoice_date : '',
   invoice_uid_genrated : 0,
   invoice_created_at : new Date()
  }

    public Invoice_items_ary : Invoice_items[] = [];
   
    public Trans_dets : Hb_trans[]=[];
  
  public cdmodels : cdmodel = {"id":0,"balance":0,"cus_name":'',"serial_no":0,amount:0,ref_no:'',bank_name:'',pay_mode:'',date:'',figure_amt:''};
  
  public navtoken:boolean=false;
  public showModal:string;
  public displayModal:string;
  public edit_mode:boolean=false;
 
  public query_demo : any = {invo_string : "",is_b2b:false,com_id:null,e_no:0}

  public msg_param : Msg_param = {"type": "single_msg","contact_no":"917012406551@c.us","msg":"Via angular","authorization":"6L5qXru1Y8dv2OcHNpfUab"}

  cus_vendorZ : Observable<Customer[]>;
  asset_listZ  :  Observable<Assets[]>;
  invoice_listZ : Observable<Res_invoice[]>;
  purchase_listZ :  Observable<Res_invoice[]>;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.showModal = 'none';
    this.displayModal = 'none';
  }

 
 
  login(model: any) {
    let body = JSON.stringify(model);
 
      return this.http
      .post(this.adminUrl + 'user_login', body,this.httpOptions)
      .pipe(catchError(this.handleError<any>('login', {"success":false,"msg":"Offline..Check internet status"} )));
  }

  cus_vendors_list_z() { 
    this.cus_vendorZ = this.get_all_cus_vendor().pipe(shareReplay(1)); 
   // console.log('this.' ,this.cus_vendorZ ) 
   }     

   post_wa_msg(c_n:any,uid:number)
   {
    console.log('uid',uid)
     this.msg_param.contact_no = '91'+ this.Company_dets.company_ph_1 + '@c.us' ;
     this.msg_param.msg = 'Gst Invoice Generated - '+ 'from ' + this.Company_dets.company_name + ' GSTIN('  + this.Company_dets.company_gstin  + ')' + ' Invoice No - '  + this.invo_head.invoice_no_genrated + '   Invoice Amt - ' + this.invo_head.grand_amt + ' To Reprint invoice visit https://store.csweb.in/#/reprint/' +uid+'  Kindly do not Reply to this msg.' ;
     
     let queryParams = new HttpParams();
     queryParams = queryParams.append("contact_no",this.msg_param.contact_no);
     queryParams = queryParams.append("msg",this.msg_param.msg);
     queryParams = queryParams.append("type",this.msg_param.type);
     queryParams = queryParams.append("authorization",this.msg_param.authorization);
     
     const url = `${'https://asaja.in/w_s'}`;
     console.log('urls',url,queryParams);   
     return this.http.get<any>(url,{ params: queryParams }).pipe(catchError(this.handleError<any>('post_wa_msg'))); 
    
   }

   
  assets_list_z(){
    this.asset_listZ = this.get_all_assets().pipe(shareReplay(1));   
  }

  invoices_list_z()
  {
    this.invoice_listZ = this.get_all_invoices().pipe(shareReplay(1)); 
  }

  purchase_list_z()
  {
    this.purchase_listZ = this.get_all_purchases().pipe(shareReplay(1)); 
  }



  cus_vendor_list_filter_cus_only() { 
    return this.cus_vendorZ.pipe(map((cusarys: Customer[]) => cusarys.filter(cus => cus.type > 0 && cus.type < 3)))
   }
   
   cus_vendor_list_filter_vendor_only() { 
    return this.cus_vendorZ.pipe(map((cusarys: Customer[]) => cusarys.filter(cus => cus.type > 2 )))
   }

   get_figure(model:any)
   {
    let body = JSON.stringify(model);   console.log('model..dw',body);   
    return this.http.post<any>(this.postUrl + 'get_figure', body, this.httpOptions).pipe(catchError(this.handleError<any>('get_figure', body)));
   }

  update_item_from_invoice_list(model:any)
  {
   let body = JSON.stringify(model);   console.log('model..',body);   
   return this.http.post<any>(this.postUrl + 'update_item_from_invoice_list', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_item_from_invoice_list', body)));
  }

 add_new_item_to_invoice(model:any)
 {
  let body = JSON.stringify(model);   console.log('model..',body);   
  return this.http.post<any>(this.postUrl + 'add_new_item_to_invoice', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_item_to_invoice', body)));
 }

 add_new_item_to_purchase(model:any)
 {
  let body = JSON.stringify(model);   console.log('model..',body);   
  return this.http.post<any>(this.cUrl + 'add_new_item_to_purchase', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_new_item_to_purchase', body)));
 }

  add_customer(model:any)
  {
    let body = JSON.stringify(model);   console.log('model..',body);   
    return this.http.post<any>(this.cUrl + 'add_customer', body, this.httpOptions).pipe(catchError(this.handleError<any>('add_customer', body)));
  }

  get_all_cus_vendor() : Observable<Customer[]>{
    const url = `${this.cUrl + 'all_cus_vendors'}/${this.user.hb7_company_detail.id}`;
    return this.http.get<Customer[]>(url, this.httpOptions)  
  }

  
  get_all_assets(){    
    const url = `${this.cUrl + 'all_assets'}/${this.user.hb7_company_detail.id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_assets')));        
   }

   get_all_invoices() : Observable<Res_invoice[]>
   {
    const url = `${this.cUrl + 'get_all_invoices'}/${this.user.hb7_company_detail.id}/${this.invo_head.fy_id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_invoices'))); 
   }

   get_all_perfoma_invoices() : Observable<Res_invoice[]>
   {
    const url = `${this.cUrl + 'get_all_perfoma_invoices'}/${this.user.hb7_company_detail.id}/${this.invo_head.fy_id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_perfoma_invoices'))); 
   }




   get_all_purchase_returns()
   {
    const url = `${this.cUrl + 'get_all_purchase_returns'}/${this.user.hb7_company_detail.id}/${this.invo_head.fy_id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_purchase_returns'))); 
   }

   get_all_purchases()
   {
    const url = `${this.cUrl + 'get_all_purchases'}/${this.user.hb7_company_detail.id}/${this.invo_head.fy_id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_purchases'))); 
   }

   get_all_tran_detail_of_a_invoice_incl_advance(id:number)
   {
    const url = `${this.cUrl + 'get_all_tran_detail_of_a_invoice_incl_advance'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_trans_detail_of_a_invoice'))); 
   }

   get_all_trans_detail_of_a_invoice_inclu_adv(id:number)
   {
    const url = `${this.cUrl + 'get_all_tran_detail_of_a_invoice_incl_advance'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_trans_detail_of_a_invoice'))); 
   }



   get_all_trans_detail_of_a_invoice(id:number)
   {
    const url = `${this.cUrl + 'get_all_trans_detail_of_a_invoice'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_trans_detail_of_a_invoice'))); 
   }

   get_all_trans_detail_of_a_purchase(id:number)
   {
    const url = `${this.cUrl + 'get_all_trans_detail_of_a_purchase'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_trans_detail_of_a_purchase'))); 
   }

   get_company_details()
   {
    const url = `${this.cUrl + 'get_company_details'}/${this.user.hb7_company_detail.id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_company_details'))); 
   }

   delete_product(id:number): Observable<any> {
    const url = `${this.cUrl + 'delete_product'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('delete_product')));       
  }

  delete_item_from_purchase(model:any): Observable<any> {
    let body = JSON.stringify(model);
         return this.http.post<any>(this.cUrl + 'delete_item_from_purchase', body, this.httpOptions).pipe(catchError(this.handleError('delete_item_from_purchase', body)));
  }

  sales_report_sales_to_specific_customer_transaction (model:any): Observable<any> {
    let body = JSON.stringify(model);
    console.log(body)
         return this.http.post<any>(this.cUrl + 'sales_report_sales_to_specific_customer_transaction', body, this.httpOptions).pipe(catchError(this.handleError('sales_report_sales_to_specific_customer_transaction', body)));
  }

  delete_a_reciept_from_invoice(model:any): Observable<any> {
    model.role = this.user.user_role;
    let body = JSON.stringify(model);
         return this.http.post<any>(this.cUrl + 'delete_a_reciept_from_invoice', body,
          this.httpOptions).pipe(catchError(this.handleError('delete_a_reciept_from_invoice', body)));
  }

  update_invoice_taxed(model:any): Observable<any> {
    let body = JSON.stringify(model);
         return this.http.post<any>(this.cUrl + 'update_invoice_taxed', body, this.httpOptions).pipe(catchError(this.handleError('update_invoice_taxed', body)));
  }

  update_purchase_taxed(model:any): Observable<any> {
    let body = JSON.stringify(model); console.log(model)
         return this.http.post<any>(this.cUrl + 'update_purchase_taxed', body, this.httpOptions).pipe(catchError(this.handleError('update_purchase_taxed', body)));
  }
  add_new_single_payment(model:any): Observable<any> {
    model.com_id = this.user.hb7_company_detail.id;
    let body = JSON.stringify(model); console.log('bo',model)
         return this.http.post<any>(this.cUrl + 'add_new_single_payment', body, this.httpOptions).pipe(catchError(this.handleError('add_new_single_payment', body)));
  }

  add_new_single_reciept(model:any): Observable<any> {
    model.com_id = this.user.hb7_company_detail.id;
    let body = JSON.stringify(model); console.log('body',model)
         return this.http.post<any>(this.cUrl + 'add_new_single_reciept', body, this.httpOptions).pipe(catchError(this.handleError('add_new_single_reciept', body)));
  }

  update_product (model:any): Observable<any> {
    let body = JSON.stringify(model);   
    return this.http.post<any>(this.postUrl + 'update_product', body, this.httpOptions).pipe(catchError(this.handleError('update_product', body)));
  }

  update_company_details (model:any): Observable<any> {
    let body = JSON.stringify(model);  
    const url = `${this.postUrl + 'update_company_details'}/${this.user.hb7_company_detail.id}`; 
    return this.http.post<any>(url, body, this.httpOptions).pipe(catchError(this.handleError('update_company_details', body)));
  }

  get_all_units(): Observable<any> {    
    const url = `${this.cUrl + 'get_all_units'}`;
    return this.http.get<any>(url, this.httpOptions)    
  }

  get_product_category()
  {
    this.post_demo.com_id = this.user.hb7_company_detail.id
    const url = `${this.cUrl + 'get_all_product_category'}/${this.user.hb7_company_detail.id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_all_product_category')));  
  }

  get_a_invoice_detail(id:number)
  {
    const url = `${this.cUrl + 'get_a_invoice_detail'}/${id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_a_invoice_detail'))); 
  }

  change_invoice_date_now(id:number,date:Date)
  {
    const url = `${this.cUrl + 'change_invoice_date'}/${id}/${date}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('change_invoice_date'))); 
  }

  change_invoice_date(id:number,date:string)
  {
    const url = `${this.cUrl + 'change_invoice_date'}/${id}/${date}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('change_invoice_date'))); 
  }

  change_invoice_date_ref(id:number,date:string)
  {
    const url = `${this.cUrl + 'change_invoice_date_ref'}/${id}/${date}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('change_invoice_date_ref'))); 
  }

  change_customer_of_invoice(id:number,cus_id:number,type:string)
  {
    console.log(id,cus_id,type)
    const url = `${this.cUrl + 'change_customer_of_invoice'}/${id}/${cus_id}/${type}`;
    console.log(url)
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('change_customer_of_invoice'))); 
  }

  change_vendor_of_purchase(id:number,cus_id:number,type:string)
  {
    const url = `${this.cUrl + 'change_vendor_of_purchase'}/${id}/${cus_id}/${type}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('change_vendor_of_purchase'))); 
  }

  add_unit(model:any)
  {   
    model.com_id = this.user.hb7_company_detail.id;  let body = JSON.stringify(model);   
    return this.http.post<any>(this.postUrl + 'add_unit', body, this.httpOptions).pipe(catchError(this.handleError('add_unit', body)));
  }

  add_product_category(model:any)
  {
        model.com_id = this.user.hb7_company_detail.id;    let body = JSON.stringify(model);   
    return this.http.post<any>(this.postUrl + 'add_product_category', body, this.httpOptions).pipe(catchError(this.handleError('add_product_category', body)));
  }

  change_password(model:any)
  {
        model.com_id = this.user.hb7_company_detail.id;  
        model.user_id = this.invo_head.user_id;        
        let body = JSON.stringify(model);    
    return this.http.post<any>(this.cUrl + 'change_password', body, this.httpOptions).pipe(catchError(this.handleError('change_password', body)));
  }

  
  add_product(model:any)
  {   
    model.com_id = this.user.hb7_company_detail.id;    let body = JSON.stringify(model);   console.log('model..',body);
    return this.http.post<any>(this.cUrl + 'add_product', body, this.httpOptions).pipe(catchError(this.handleError('add_product', body)));
  }

  get_stock_qty(id:number)
  {
    const url = `${this.cUrl + 'get_stock_qty'}/${id}/${this.user.hb7_company_detail.id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_stock_qty'))); 
  }

  
  get_stock_qty_report(id:number,date:any)
  {
    const url = `${this.cUrl + 'get_stock_qty_report'}/${id}/${date}/${this.user.hb7_company_detail.id}`;
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('get_stock_qty_report'))); 
  }

  delete_customer(model:any)
  {
    model.com_id = this.user.hb7_company_detail.id; let body = JSON.stringify(model);   
       return this.http.post<any>(this.postUrl + 'delete_customer', body, this.httpOptions).pipe(catchError(this.handleError('delete_customer', body)));
  }

  delete_item_from_invoice_list(id:number,master_id:number,index_no:number)
  {
   
    const url = `${this.cUrl + 'delete_item_from_invoice_list'}/${id}/${master_id}/${index_no}`;
    console.log('urls',url);   
    return this.http.get<any>(url,this.httpOptions).pipe(catchError(this.handleError<any>('delete_item_from_invoice_list'))); 
  }
  update_customer(model:any)
  {
    model.com_id = this.user.hb7_company_detail.id;  let body = JSON.stringify(model);   
    return this.http.post<any>(this.postUrl + 'update_customer', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_customer', body)));
  }

  update_item_on_purchase_update_model_close(model:any)
  {  
    model.com_id = this.user.hb7_company_detail.id;  let body = JSON.stringify(model);    console.log('body.....', body); 
    return this.http.post<any>(this.cUrl + 'update_item_on_purchase_update_model_close', body, this.httpOptions).pipe(catchError(this.handleError<any>('update_item_on_purchase_update_model_close', body)));
  }


  post_invoice_taxed(model: any) {
    let body = JSON.stringify(model);   
    return this.http.post(this.cUrl + 'post_invo_taxed', body,this.httpOptions).pipe(catchError(this.handleError<any>('post_invoice_taxed', body)));
  }



  post_sales_return_taxed(model: any) {
    let body = JSON.stringify(model);
    console.log('body.....', body);
    return this.http.post(this.cUrl + 'post_sales_return_taxed', body,this.httpOptions).pipe(catchError(this.handleError<any>('_post_sales_return_taxed', body)));
  }

  post_debit_note_taxed(model: any) {
    let body = JSON.stringify(model);
    console.log('body.....', body);
    return this.http
      .post(this.cUrl + 'post_debit_note_taxed', body,this.httpOptions)
      .pipe(catchError(this.handleError<any>('post_debit_note_taxed', body)));
  }

  post_debit_note_taxed_edited(model: any) {
    let body = JSON.stringify(model);
    console.log('body.....', body);
    return this.http
      .post(this.cUrl + 'post_debit_note_taxed_edited', body,this.httpOptions)
      .pipe(catchError(this.handleError<any>('post_debit_note_taxed_edited', body)));
  }

  post_purchase_taxed(model: any) {
    let body = JSON.stringify(model);
    console.log('body.....p', body);
    return this.http
      .post(this.cUrl + 'post_purchase', body,this.httpOptions)
      .pipe(catchError(this.handleError<any>('post_purchase_taxed', body)));
  }


  summary_gst_b2bs(model: any){
       let body = JSON.stringify(model); console.log('body.....p', body);
       return this.http.post(this.cUrl + 'summary_gst_b2bs', body,this.httpOptions)
        .pipe(catchError(this.handleError<any>('summary_gst_b2bs', body)));
    }

    summary_sales_daily_stock(model: any){
      let body = JSON.stringify(model); console.log('body.....p', body);
      return this.http.post(this.cUrl + 'summary_sales_daily_stock', body,this.httpOptions)
       .pipe(catchError(this.handleError<any>('summary_sales_daily_stock', body)));
   }

   summary_sales_all_cash_daily(model: any){
    let body = JSON.stringify(model); console.log('body.....p', body);
    return this.http.post(this.cUrl + 'summary_sales_all_cash_daily', body,this.httpOptions)
     .pipe(catchError(this.handleError<any>('summary_sales_all_cash_daily', body)));
 }

    summary_gst_b2c_small(model: any){
      let body = JSON.stringify(model); console.log('body.....p', body);
      return this.http.post(this.cUrl + 'summary_gst_b2c_small', body,this.httpOptions)
       .pipe(catchError(this.handleError<any>('summary_gst_b2c_small', body)));
   }

   summary_sales_hsn_wise_stock(model: any){
    let body = JSON.stringify(model); console.log('body.....p', body);
    return this.http.post(this.cUrl + 'summary_sales_hsn_wise_stock', body,this.httpOptions)
     .pipe(catchError(this.handleError<any>('summary_sales_hsn_wise_stock', body)));
 }

 summary_sales_hsn_wise_stock_b2b(model: any){
  let body = JSON.stringify(model); console.log('body.....p', body);
  return this.http.post(this.cUrl + 'summary_sales_hsn_wise_stock_b2b', body,this.httpOptions)
   .pipe(catchError(this.handleError<any>('summary_sales_hsn_wise_stock_b2b', body)));
}
summary_sales_hsn_wise_stock_b2c(model: any){
  let body = JSON.stringify(model); console.log('body.....p', body);
  return this.http.post(this.cUrl + 'summary_sales_hsn_wise_stock_b2c', body,this.httpOptions)
   .pipe(catchError(this.handleError<any>('summary_sales_hsn_wise_stock_b2c', body)));
}

 summary_sales_period_stock(model: any){
  let body = JSON.stringify(model); console.log('body.....p', body);
  return this.http.post(this.cUrl + 'summary_sales_period_stock', body,this.httpOptions)
   .pipe(catchError(this.handleError<any>('summary_sales_period_stock', body)));
}

 

  sales_report_common_(model:any)
  {
    let body = JSON.stringify(model);
    console.log('body.....p', body);
    return this.http
      .post(this.cUrl + 'sales_report_common_', body,this.httpOptions)
      .pipe(catchError(this.handleError<any>('sales_report_common_', body)));

  }

  gst_report_hsn_(model: any) {
    let body = JSON.stringify(model);
    console.log('body.....p', body);
    return this.http
      .post(this.cUrl + 'gst_report_hsn_', body,this.httpOptions)
      .pipe(catchError(this.handleError<any>('gst_report_hsn_', body)));
  }


  upload_logo(model: any) {
    let body = JSON.stringify(model);
    console.log('body.....p', body);
    return this.http
      .post(this.cUrl + 'upload_logo', body,this.httpOptions)
      .pipe(catchError(this.handleError<any>('gst_report_common', body)));
  }
  logout() :void {
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('token');
  }











  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
