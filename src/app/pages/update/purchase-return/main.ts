






  import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';

import {AngularMyDatePickerDirective, DefaultView, IAngularMyDpOptions,IMyInputFieldChanged, 
  IMyDateModel, IMyMarkedDate, CalAnimation} from  'angular-mydatepicker';
  import { ShortcutInput, ShortcutEventOutput,KeyboardShortcutsComponent  } from "ng-keyboard-shortcuts";


import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../../../services/data.service';
  

@Component({
  selector: 'app-new-purchase-return-edit',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Purchase_Return_edit_Component implements OnInit {


    CUS_MODEL : any;
    ia : number = 0;
    ka : number = 0;
    date_edit : boolean = false;
    date_edit_ref : boolean = false;
    cus_edit  : boolean = false;
    push_disabled : boolean = false;
    toogle_head_det : boolean = false;
    arrayOfVendors : any [] = [];
    color : string ;
    pro_np  : number;
    pro_np_model : number;
    pro_price : number;
    pro_tax : number;
    pro_p_model : number;
    pro_qty_model : number;
    pro_name_model : string;
    pro_hsn : string;
    pro_unit : string;
    pro_qty : number = 1;
    pro_name : string;
    pro_barcode : string;
    arrayOfKeyValues :  any [] =[];
    selectedStatus :  number = 1;
    push_disabled_enter : number = 1;
    mobile_view : boolean = false;
    public disabled: boolean = true;
    public locale: string = 'en';
    public model_date: IMyDateModel = null;
    public invoice_date_ref : IMyDateModel = null;
    d_ : number = 0;
    loop_var : number = 0;

    pdt_tax_list_counter : number;
    invo_post_model : any;

    public myDatePickerOptions: IAngularMyDpOptions = {
        dateRange: false,
        dateFormat: 'dd-mm-yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        markCurrentDay: true,
        alignSelectorRight: false,
        openSelectorTopOfInput: false,
        minYear: 2019,
        maxYear: 2200,
        showSelectorArrow: true,
        monthSelector: true,
        yearSelector: true,
        satHighlight: false,
        highlightDates: [],
        disableDates: [],
        disableHeaderButtons: true,
        showWeekNumbers: false,
        disableDateRanges: [
          {begin: {year: 2016, month: 10, day: 5}, end: {year: 2016, month: 10, day: 7}},
          {begin: {year: 2016, month: 10, day: 10}, end: {year: 2016, month: 10, day: 12}}
        ],
        disableUntil: {year: 0, month: 0, day: 0},
        disableSince: {year: 2022, month: 2, day: 2},
        disableWeekdays: [],
        markDates: [],
        markWeekends: <IMyMarkedDate>{},
        selectorHeight: '200px',
        selectorWidth: '220px',
        closeSelectorOnDateSelect: true,
        closeSelectorOnDocumentClick: true,
        showMonthNumber: true,
        appendSelectorToBody: false,
        focusInputOnDateSelect: true,
        dateRangeDatesDelimiter: " - ",
        defaultView: DefaultView.Date,
        showFooterToday: false,
        calendarAnimation: {in: CalAnimation.ScaleCenter, out: CalAnimation.Fade},
        rtl: false,
        stylesData:
          {
            selector: '',
            styles: ''
          }
      };


  constructor(   
    private rs: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService,
    public api : ApiService,
    private fb: FormBuilder,
    public ds : DataService
  ) {  }


 
   
  

  ngOnInit(): void {     console.log('ss', this.api.invoice_id); this.get_a_invoice_detail();   this.get_vendors()   

  while (this.api.Invoice_items_ary.length > 0) 
  {
    this.api.Invoice_items_ary.pop();                                               
  }
  
}

get_products()
{
 this.api.asset_listZ
 .subscribe((jsonData) => { this._get_products(jsonData)
         },(err) => console.error(err),
          
         );
}

_get_products(json :any)
{   
 console.log('pdts',json)
this.arrayOfKeyValues = json;
}

            
  get_a_invoice_detail()
  {
      this.api.get_a_invoice_detail(this.api.invoice_id) 
      .subscribe((jsonData) => { this.get_res_bil(jsonData)
      },(err) => console.error(err),                                           
     );
  }
  get_res_bil(data:any)
  {
      console.log('data....$',data)

      this.api.invo_head.invoice_date = data.invoice_date;
      this.api.invo_head.invoice_no  = data.invoice_no;
      this.api.invo_head.invoice_no_genrated  = data.invoice_no;
      this.api.invo_head.ref_invoice_number = data.ref_invoice_number;
      this.api.invo_head.ref_invoice_date = data.ref_invoice_date;

      this.api.invo_head.customer_Name = data.hb7_customer.name;
      this.api.invo_head.customer_Address_2 = data.hb7_customer.address_1
      this.api.invo_head.customer_Address_3  = data.hb7_customer.address_2
      this.api.invo_head.customer_Ph1 = data.hb7_customer.ph 
      this.api.invo_head.customer_Ph2 = data.hb7_customer.mob
      this.api.invo_head.customer_Address_1 = data.hb7_customer.steet
      this.api.invo_head.customer_Gstin = data.hb7_customer.gst_in
      this.api.invo_head.type = data.type 
      this.api.invo_head.cast = data.cast
      this.api.invo_head.customer_Email = data.hb7_customer.email
      this.api.invo_head.cus_id = data.hb7_customer.id;
      this.api.invo_head.recieved_amt = 0;
    //   this.adv_cash = data.recieved_amt;
      this.api.invo_head.pre_cash_total = data.recieved_amt;
      this.api.invo_head.due_amt = data.due_amt;
     // this.api.invo_head.grand_amt = data.payable_amt;
      this.api.invo_head.idx = data.id;
      this.CUS_MODEL = {id:data.hb7_customer.id, com_id:data.hb7_customer.com_id , gst_in: data.hb7_customer.gst_in, name: data.hb7_customer.name, street:data.hb7_customer.street ,
      address_1: data.hb7_customer.address_1,address_2:data.hb7_customer.address_2,cast:data.hb7_customer.cast,createdAt:"2021-08-12T05:54:30.000Z",credit_balance:data.hb7_customer.credit_balance,
      email:data.hb7_customer.email,mob:data.hb7_customer.mob,opening_balance:data.hb7_customer.opening_balance,ph:data.hb7_customer.ph,type:data.hb7_customer.type,updatedAt: "2021-08-27T10:42:48.000Z"}
      if(data.due_amt > 0)
        {
          //this.selectedStatus =  2
        }
        else
        {
         // this.selectedStatus =  1
        }  

        for(var i = 0; i<data.hb7_invoice_details.length;i++)
        {

          this.pro_np = data.hb7_invoice_details[i].rate + ((data.hb7_invoice_details[i].rate * data.hb7_invoice_details[i].Hb7_product.tax_rate)/100)
          this.pro_np = Math.round(this.pro_np * 100) / 100;
          console.log('vvovo',this.pro_np);

           this.stack_push(data.hb7_invoice_details[i].index_no,data.hb7_invoice_details[i].product_id,0,0,0,data.hb7_invoice_details[i].qty,
            data.hb7_invoice_details[i].rate,data.hb7_invoice_details[i].mrp,data.hb7_invoice_details[i].Hb7_product.tax_rate,
            data.hb7_invoice_details[i].Hb7_product.product_name,this.pro_np,data.hb7_invoice_details[i].product_description,data.hb7_invoice_details[i].Hb7_product.hsn_code,
            data.hb7_invoice_details[i].Hb7_product.hb7_unit.unit,data.hb7_invoice_details[i].id);
        }
        this.ia = data.hb7_invoice_details.length;
    
  }

  stack_push(index_no:number,pro_id:number,batch_id:number,free_qty:number,
    master_id:number,qty:number,rate:number,mrp:number,tax:number,pro_name:string,pro_np:number,pro_desc:any,hsn:string,unit:string,idx:number)
  {
    this.api.Invoice_items_ary.push({"index_no":index_no,"product_id":pro_id,"batch_id":batch_id,
    "free_qty":free_qty,"master_id":master_id,
    "qty":qty,"rate":rate,"mrp":mrp ,"tax":tax,"product_name":pro_name,
    "unit":unit,"value":pro_np,"product_description":pro_desc,"hsn_code": hsn,"idx":idx})
  }

  toogle_head_dets()
  {
    this.toogle_head_det = !this.toogle_head_det;
  }
  customCallback(e:any)
  {

  }
  change_vendor_name(ev:any)
  {

  }

  onInputFieldChanged(evs:any)
  {

  }
  
  onDateChanged(event: IMyDateModel): void {
     console.log('onDateChanged(): ', event); 
     this.api.invo_head.invoice_date = event.singleDate.jsDate.toISOString(); 
     this.date_edit = !this.date_edit;
     this.api.change_invoice_date(this.api.invoice_id,this.api.invo_head.invoice_date)
     .subscribe((jsonData) => { this.get_res_dc(jsonData)},(err) => console.error(err),);    

   }

   onDateChanged_ref(event: IMyDateModel): void {
    console.log('onDateChanged(): ', event); 
    this.api.invo_head.ref_invoice_date = event.singleDate.jsDate.toISOString(); 
    this.date_edit = !this.date_edit;
    // this.api.change_invoice_date_ref(this.api.invoice_id,this.api.invo_head.ref_invoice_date)
    // .subscribe((jsonData) => { this.get_res_dc(jsonData)},(err) => console.error(err),);    

  }

   get_res_dc(resp:any)
   {
       console.log('res',resp)
       if(resp.success == true)
       {
        this.toastr.success(resp.msg);
       }
       else
       {
        this.toastr.warning(resp.msg);
       }
      
   }
  edit_date()
  {
    this.date_edit = !this.date_edit
  }
  edit_date_ref()
  {
    {
      this.date_edit_ref = !this.date_edit_ref
    }
  }
  edit_customer()
  {
      this.cus_edit = !this.cus_edit;
  }






  get_vendors()
  { 
    this.api.cus_vendor_list_filter_vendor_only()
    .subscribe((jsonData) => { this.get_vendor_res(jsonData)
                        },(err) => console.error(err),
                        
                        );
  }

 get_vendor_res(json:any)
 {
   console.log('res..',json);
    this.arrayOfVendors  = json;
 }

 close_modal()
 {

 }
 keyup_net_price()
 {

 }
 keyup_net_price_e()
 {

 }

 keyup_price_e()
 {

 }
 keyup_price()
 {

 }
 save_Purchase_taxed()
 {

 }



 change_in_ro()
 {

 }

 RemoveItem(index:any)
 {

 }

 
 editItem(index:any)
 {

 }

 pushItem_down()
 {
 }
 change_item_name(i_c:any)
 {
 }
 move_to_round()
 {

 }

 Tax_info(data:any)
 {

  while (this.ds.Tax_info.item.length > 0) 
  {
    this.ds.Tax_info.item.pop();                                                                      
  }

  

 this.pdt_tax_list_counter = 1;

for(var liss = 0;liss<data.length;liss++)
{


console.log('liss',data[liss].tax);

if(liss == 0)
{ 

this.ds.push_tax_info();
this.ds.Tax_info.item[0].TAX = data[0].tax
this.ds.Tax_info.item[0].PRICE = data[0].rate;
this.ds.Tax_info.item[0].NET_VALUE = data[0].rate * data[liss].qty;
this.ds.Tax_info.item[0].CGST =  (this.ds.Tax_info.item[0].NET_VALUE *  (this.ds.Tax_info.item[0].TAX)/2) / 100;
this.ds.Tax_info.item[0].SGST = (this.ds.Tax_info.item[0].NET_VALUE *  (this.ds.Tax_info.item[0].TAX)/2) / 100;


}

else
{

const in_tax = this.ds.Tax_info.item.findIndex(xyu => xyu.TAX == data[liss].tax)
if(in_tax < 0)

{

this.ds.push_tax_info();

this.ds.Tax_info.item[this.pdt_tax_list_counter].TAX =  data[liss].tax

this.ds.Tax_info.item[this.pdt_tax_list_counter].PRICE = data[liss].rate;

this.ds.Tax_info.item[this.pdt_tax_list_counter].NET_VALUE = data[liss].rate * data[liss].qty ;

var temp_net_val =  data[liss].rate * data[liss].qty;

this.ds.Tax_info.item[this.pdt_tax_list_counter].CGST =   (temp_net_val *  (data[liss].tax)/2) / 100;
this.ds.Tax_info.item[this.pdt_tax_list_counter].SGST =   (temp_net_val *  (data[liss].tax))/2 / 100;


this.pdt_tax_list_counter = this.pdt_tax_list_counter + 1;
}

else
{

this.ds.Tax_info.item[in_tax].NET_VALUE = this.ds.Tax_info.item[in_tax].NET_VALUE + data[liss].rate * data[liss].qty;
this.ds.Tax_info.item[in_tax].CGST =  (this.ds.Tax_info.item[in_tax].NET_VALUE *  (this.ds.Tax_info.item[in_tax].TAX)/2) / 100;
this.ds.Tax_info.item[in_tax].SGST =  (this.ds.Tax_info.item[in_tax].NET_VALUE *  (this.ds.Tax_info.item[in_tax].TAX)/2) / 100;

}
}
}
console.log('list',this.ds.Tax_info);



}


 update_purchase_return()
 {
              this.change_in_payment();
                                        
              this.api.invo_head.status = 1;  
              
              if(this.api.invo_head.cus_id == 1)
              {
                this.api.invo_head.customer_Name = 'Cash'
              }
              
            
              if( this.api.invo_head.due_amt == 0)
              {
                this.api.invo_head.white_flag = 3
              }
              else{
                if(this.api.invo_head.recieved_amt > 0)
                {
                  this.api.invo_head.white_flag  = 2
                }
                else
                {
                  this.api.invo_head.white_flag  = 1
                }

                
              }

            if(this.api.Invoice_items_ary.length < 1) 
            {
              alert('No Item Found....')
            }
            else
            {
              this.push_disabled_enter = 2; 
              
              this.Tax_info(this.api.Invoice_items_ary); 
              
              this.invo_post_model = {
                items : this.api.Invoice_items_ary,
                head : this.api.invo_head,
                cash_status : this.selectedStatus,
              }

              this.get_figure(this.api.invo_head.grand_amt);
            }
                                    

 }

 change_in_payment()
 {
   this.calculation();       
   this.api.invo_head.balance_amt = (this.api.invo_head.recieved_amt-0) - (this.api.invo_head.grand_amt-0)                    
   if(this.api.invo_head.balance_amt < 0 )
   {
     this.api.invo_head.due_amt = (0-this.api.invo_head.balance_amt);
     this.selectedStatus = 2
     
   }
   else
   {
     this.api.invo_head.due_amt   = 0;
     this.selectedStatus = 1
     
   }
 }


 get_figure(x:any)
 {
     
  this.api.query_demo.num_to_string = x;
   this.api.get_figure(this.api.query_demo)
   .subscribe((jsonData) => { this.getjson87(jsonData)
                      },(err) => console.error(err),
                        
                      );

 }

getjson87 (p:any)
{

console.log('vvavva',p)
this.api.figure_grand = p.msg;

this.api.post_debit_note_taxed_edited(this.invo_post_model)
.subscribe((jsonData) => { this.get_res(jsonData)
              },(err) => console.error(err),                                           
             );


}

 get_res(json:any)
 {
   this.push_disabled_enter = 3;
      console.log('js',json)
     

     if(json.success == true)
     {

    //   this.api.invo_head.invoice_no_genrated  = json.mas_id;

       if(this.mobile_view == true)
       {
         setTimeout(() => 
       {
       
         this.rs.navigate(['/home/new']);
         
       },
       2000);

       }
       else {

       setTimeout(() => 
       {
       
         window.print();
         
       },
       800);

       setTimeout(() => 
       {
       
         this.rs.navigate(['/home/new']);
         
       },
       2000);
     }

    }
    else{
      alert('Errors in entry ..... ')
    }

}


 calculation()
 {
  // this.api.sub_total = 0;

   this.api.total_qty = 0;
   this.api.invo_head.total_taxable = 0;
   this.api.invo_head.total_tax_amt = 0;
   this.api.mrp_total = 0;
 
         

       for(this.loop_var = 0;this.loop_var<this.ia;this.loop_var++)
       {
         this.api.mrp_total = this.api.mrp_total +  this.api.Invoice_items_ary[this.loop_var].mrp;              
         this.api.total_qty = this.api.total_qty + this.api.Invoice_items_ary[this.loop_var].qty;

         this.d_ = (this.api.Invoice_items_ary[this.loop_var].rate *  this.api.Invoice_items_ary[this.loop_var].tax/100 ) * this.api.Invoice_items_ary[this.loop_var].qty 

         this.api.invo_head.total_tax_amt = this.api.invo_head.total_tax_amt + this.d_


         this.api.invo_head.total_taxable =   this.api.invo_head.total_taxable +
                                              
                          (this.api.Invoice_items_ary[this.loop_var].rate * this.api.Invoice_items_ary[this.loop_var].qty) 

          
       }
  
     
    this.api.invo_head.total_taxable = Math.round(  this.api.invo_head.total_taxable * 100) / 100;

    this.api.mrp_total  = Math.round(  this.api.mrp_total  * 100) / 100;

  this.api.invo_head.grand_amt =  (this.api.invo_head.total_taxable + this.api.invo_head.total_tax_amt)

  this.api.invo_head.grand_amt = Math.round(this.api.invo_head.grand_amt * 100) / 100;


  

  this.api.floor =  Math.floor(this.api.invo_head.grand_amt); 
  
  this.api.frac =  this.api.invo_head.grand_amt -  this.api.floor;
  

  

  if(this.api.frac > .49)
  {
    this.api.frac = 1 - this.api.frac;
    this.api.floor = this.api.floor + 1;

  }
  this.api.frac =   Math.round(this.api.frac * 100) / 100;


  //       this.api.frac   is the round off

this.api.invo_head.grand_amt = this.api.floor;

 }



  
}


