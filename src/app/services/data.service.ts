import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { items_tax,figure } from './model';
import { invoice_head,invoice_varibs,invoice_master,invoice_tails,company_dets } from './model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
 

  public navtoken:boolean=false;
  public showModal:string;
  public displayModal:string;
  public edit_mode:boolean=false;

  Tax_info = new items_tax(1,[]);
  
  user_id : number;
  user_role : string; 
  post_demo : any = {invo_string : "",is_b2b:false,com_id:null,e_no:0}
  report_demo : any = {report_type : "",from_date:'',to_date:'',e_no:0}
  
 
  
  post_url_local = 'http://localhost:8088/api/post/';
  admin_url_local = 'http://localhost:8088/api/admin_routes/';
  
  total_qty : number = 0;
  mrp_total : number = 0;
  price_total : number = 0;
  total_tax : number = 0;
  grand_total : number = 0;
  floor : number = 0;
  frac : number = 0;
  now_date : Date;
  now_d : boolean = false;
  now_vendor : boolean = false;
  now_id : boolean = false;

  cus_ : any[] = [];
  

  fig_model = new figure(0,0,'');
  fig_main : string ='';
  fig_tax : string = '';
  

 
  i_h = new invoice_head(null,null,new Date(),null,null,0,null,null,null,null,0,null,null,null,0,0,0,0,0,0,1,'','',0,'','','','')
  i_v = new invoice_varibs(0,0)
  i_t = new invoice_tails(0,0,0,0,null,0,0)
  com_dets = new company_dets('','','','','','','','','',0,'')
  i_m = new invoice_master(this.i_h,[],this.i_v,this.i_t,this.com_dets) ; 

 

  

  com_id : number = 1 ;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.showModal = 'none';
    this.displayModal = 'none';
  }

  push_tax_info()
  {
      this.Tax_info.item.push({ SI:1,QUANTITY:0,PRICE:null,TAX:null,NET_PRICE:null,NET_VALUE:null,CGST:null,SGST:null,KFC:null})

  }

  getData() {
    return this.http.get('/assets/config.json');
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


















  












 

