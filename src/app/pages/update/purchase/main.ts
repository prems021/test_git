import { Component, OnInit,ViewChild,ElementRef,Inject  } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';

import {AngularMyDatePickerDirective, DefaultView, IAngularMyDpOptions,IMyInputFieldChanged, 
  IMyDateModel, IMyMarkedDate, CalAnimation} from  'angular-mydatepicker';
  import { ShortcutInput, ShortcutEventOutput,KeyboardShortcutsComponent  } from "ng-keyboard-shortcuts";



import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {  DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-purchase',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Purchase_update_Component implements OnInit {

    invo_post_model : any; 
    myModal_5 : any;
    CUS_MODEL : any;
    ia : number = 0;
    ka : number = 0;
    myModal_3 : any;
    dueStatus : number = 0;
    date_edit : boolean = false;
    cus_edit  : boolean = false;
    push_disabled : boolean = false;
    toogle_head_det : boolean = false;
    arrayOfVendors : any [] = [];
    color : string ;
    pro_id : number = 0;
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
    loop_var : number = 0;
    d_ : number = 0;
    on_edit : boolean = false; 
    pro_tax_model : number;
    arrayOfKeyValues :  any [] =[];
    push_disabled_enter : number = 1;
    update_item_model :any;
    delete_item_model: any;
    adv_cash : number = 0;
    public disabled: boolean = true;
    public locale: string = 'en';
    public model_date: IMyDateModel = null;
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
        disableSince: {year: 2025, month: 2, day: 2},
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

      @ViewChild("item_qty_model") _eq: ElementRef; 
      @ViewChild("autos") _en: ElementRef; 
      @ViewChild("item_qty_model_e") _eq_e: ElementRef; 
  uu: number;
  uun: number;
  
     


  constructor(   
    private rs: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService,
    public api : ApiService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    public dialog: MatDialog  
  ) {  }


 
   
  

  ngOnInit(): void { 
    
    this.myModal_5 = document.getElementById("myModal_5");   
    
              this.api.invo_head.total_taxable = 0;
              this.api.invo_head.total_tax_amt = 0;
              this.api.invo_head.pre_cash_total = 0;
              
                       
            
            this.get_a_invoice_detail();   this.get_vendors(); this.get_products();   

            while (this.api.Invoice_items_ary.length > 0) 
            {
              this.api.Invoice_items_ary.pop();                                               
            }

            this.myModal_3 = document.getElementById("myModal_3");

  
      
          }


                     update_vendor()
                     {

                     this.api.change_vendor_of_purchase(this.api.invoice_id,this.api.invo_head.cus_id,this.api.invo_head.type)
                     .subscribe((jsonData) => { this.get_res_dc(jsonData)},(err) => console.error(err));  
                     }
                     get_res_dc(resp:any)
                     {
                         
                         if(resp.success == true)
                         {
                          this.toastr.success(resp.msg);
                         }
                         else
                         {
                          this.toastr.warning(resp.msg);
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
      

      this.api.invo_head.invoice_date = data.invoice_date;
      this.api.invo_head.invoice_no_pur  = data.invoice_no_pur;
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
      this.api.invo_head.round_off = data.round_off;
      this.api.frac = this.api.invo_head.round_off
      this.api.invo_head.round_off = this.api.frac;

      this.api.invo_head.due_amt = 0;






      this.api.invo_head.idx = data.id;
      
      this.CUS_MODEL = {id:data.hb7_customer.id, com_id:data.hb7_customer.com_id , gst_in: data.hb7_customer.gst_in, name: data.hb7_customer.name, street:data.hb7_customer.street ,
      address_1: data.hb7_customer.address_1,address_2:data.hb7_customer.address_2,cast:data.hb7_customer.cast,createdAt:"2021-08-12T05:54:30.000Z",credit_balance:data.hb7_customer.credit_balance,
      email:data.hb7_customer.email,mob:data.hb7_customer.mob,opening_balance:data.hb7_customer.opening_balance,ph:data.hb7_customer.ph,type:data.hb7_customer.type,updatedAt: "2021-08-27T10:42:48.000Z"}
  




        for(var i = 0; i<data.hb7_invoice_details.length;i++)
        {

          this.pro_np = data.hb7_invoice_details[i].rate + ((data.hb7_invoice_details[i].rate * data.hb7_invoice_details[i].tax)/100)
          this.pro_np = Math.round(this.pro_np * 100) / 100;
          

           this.stack_push_c(data.hb7_invoice_details[i].index_no,data.hb7_invoice_details[i].product_id,0,0,0,data.hb7_invoice_details[i].qty,
            data.hb7_invoice_details[i].rate,data.hb7_invoice_details[i].mrp,data.hb7_invoice_details[i].tax,
            data.hb7_invoice_details[i].Hb7_product.product_name,this.pro_np,data.hb7_invoice_details[i].product_description,data.hb7_invoice_details[i].Hb7_product.hsn_code,
            data.hb7_invoice_details[i].Hb7_product.hb7_unit.UQC_Code,data.hb7_invoice_details[i].id);
        }
        this.ia = data.hb7_invoice_details.length;
        
        

        this.pro_np  = null;
    
    

        //  this.get_all_trans_detail();



        this.api.Trans_dets = [];                 
 
        var su = 0;
      for(this.uu = 0; this.uu<data.hb7_trans_masters.length; this.uu++ )
      {
       
      
         this.api.Trans_dets.push({"amount":  data.hb7_trans_masters[this.uu].amount,"cast": "SALE",
         "createdAt": data.hb7_trans_masters[this.uu].createdAt,"ref_no":data.hb7_trans_masters[this.uu].ref_no,
         "date": data.hb7_trans_masters[this.uu].date,
          "serial_no":data.hb7_trans_masters[this.uu].serial_no,
         "deletedAt": null,
         "id": data.hb7_trans_masters[this.uu].id,
         "is_bulk_pay": false,
         master_id: data.hb7_trans_masters[this.uu].master_id,
         mode: data.hb7_trans_masters[this.uu].mode,
         status: data.hb7_trans_masters[this.uu].status,
         type: "CREDIT",
         updatedAt: data.hb7_trans_masters[this.uu].updatedAt})
 su = su +  data.hb7_trans_masters[this.uu].amount;
        
      }

     
  
      this.api.invo_head.pre_cash_total = this.api.invo_head.pre_cash_total + su ;


   this.toogle_head_det = true;
   this.push_disabled_enter = 1;

  

   this.change_in_ro();

  }
 

 

  add_a_pays(item:any)
  {
    
    const dialogRef = this.dialog.open(Pre_pay_add_component, {
      width: '80%',
      data: { data: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.renew_view_reciept_table();
    });

  }
  renew_view_reciept_table()
        {
          while (this.api.Trans_dets.length > 0) 
          {
            this.api.Trans_dets.pop();                                               
          }


          this.api.get_all_trans_detail_of_a_purchase(this.api.invoice_id) 
          .subscribe((jsonData) => { this.get_res_s(jsonData)
          },(err) => console.error(err),                                           
         );
           
         
        }
        get_res_s(data:any)
        {
         
          this.api.invo_head.pre_cash_total = 0;
          
          var subsum = 0;
          for(this.uun = 0; this.uun<data.length; this.uun++ )
          {
           this.api.Trans_dets.push({"amount":  data[this.uun].amount,"cast": "SALE",serial_no:0,ref_no : data[this.uun].ref_no,
                     "createdAt": data[this.uun].createdAt,
                     "date": data[this.uun].date,
                     "deletedAt": null,
                     "id": data[this.uun].id,
                     "is_bulk_pay": false,
                     master_id: data[this.uun].master_id,
                     mode: data[this.uun].mode,
                     status: data[this.uun].status,
                     type: "CREDIT",
                     updatedAt: data[this.uun].updatedAt})


                     subsum = subsum +  data[this.uun].amount;
          }

      
      
          this.api.invo_head.pre_cash_total = this.api.invo_head.pre_cash_total + subsum + this.adv_cash;
          this.calculation();

        }


  stack_push_c(index_no:number,pro_id:number,batch_id:number,free_qty:number,
    master_id:number,qty:number,rate:number,mrp:number,tax:number,pro_name:string,pro_np:number,
    pro_desc:any,hsn:string,unit:string,idx:number)
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

    this.api.invo_head.cus_id = ev.id
    if(this.api.invo_head.cus_id == undefined)
    {
      this.api.invo_head.cus_id = 1;
      this.api.invo_head.customer_Name = 'Cash';
      this.api.invo_head.customer_Address_1 = null
      this.api.invo_head.customer_Address_2 = null
      this.api.invo_head.customer_Address_3 = null
      this.api.invo_head.customer_Email = null
      this.api.invo_head.customer_Gstin = null
      this.api.invo_head.customer_Ph1 = null
      this.api.invo_head.customer_Ph2 = null
      this.api.invo_head.type_ex = 'B2C';
    }

    else
    {

     
      this.api.invo_head.customer_Name = ev.name
      this.api.invo_head.customer_Address_1 = ev.street
      this.api.invo_head.customer_Address_2 = ev.address_1
      this.api.invo_head.customer_Address_3 = ev.address_2
      this.api.invo_head.customer_Email = ev.email
      this.api.invo_head.customer_Gstin = ev.gst_in 
      this.api.invo_head.customer_Ph1 = ev.ph
      this.api.invo_head.customer_Ph2 = ev.mob

        
      if(ev.cast == 1)
      {  
       if(ev.gst_in.length > 10)
            {   
              this.api.invo_head.type_ex = 'B2B';
            }
            else
            {
             this.api.invo_head.type_ex = 'B2C';
            }
      } 
      if(ev.cast == 2)
          {                                                
            this.api.invo_head.type_ex = 'IGST'; 
          }
         if(ev.cast == 3)
                      {   
                     this.api.invo_head.type_ex = 'SEZ';  
                      }

                      if(ev.cast == 5)
                      {   
                     this.api.invo_head.type_ex = 'INTL';  
                      }

    }




    }

  
  

  onInputFieldChanged(evs:any)
  {

  }
  
  onDateChanged(event: IMyDateModel): void {

        
    this.api.invo_head.invoice_date = this.datepipe.transform(event.singleDate.jsDate,'yyyy-MM-dd');    
    this.date_edit = !this.date_edit;
    this.api.change_invoice_date(this.api.invoice_id,this.datepipe.transform(event.singleDate.jsDate,'yyyy-MM-dd'))
    .subscribe((jsonData) => { this.get_res_date_change(jsonData)},(err) => console.error(err),);  

   }
   get_res_date_change(resp:any)
   {
       
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
   
    this.arrayOfVendors  = json;
 }
 keyup_price_tax()
 {
  if(this.pro_p_model != undefined)
  {
  this.pro_np_model = this.pro_p_model + ((this.pro_p_model * this.pro_tax_model)/100)
  this.pro_np_model = Math.round(this.pro_np_model * 100) / 100;
  }
  else
  {
    this.pro_np_model = 0;
  }
 }


 close_modal_update()
 {
  this.api.Invoice_items_ary[this.ka].qty = this.pro_qty_model;
  this.api.Invoice_items_ary[this.ka].rate = this.pro_p_model;
  this.api.Invoice_items_ary[this.ka].value = this.pro_np_model; 
  this.api.Invoice_items_ary[this.ka].tax  =  this.pro_tax_model
  
  this.myModal_3.style.display = "none";
  this._en.nativeElement.value = null;
  this._en.nativeElement.focus();

  
  this.invo_post_model = {
    idx:  this.api.Invoice_items_ary[this.ka].idx,
     qty : this.api.Invoice_items_ary[this.ka].qty,
     rate : this.api.Invoice_items_ary[this.ka].rate,
     value : this.api.Invoice_items_ary[this.ka].value,
     tax_rate : this.api.Invoice_items_ary[this.ka].tax,
  } 

  this.api.update_item_on_purchase_update_model_close(this.invo_post_model)
  .subscribe((jsonData) => { this.get_res_update_model_close(jsonData)
                  },(err) => console.error(err),
                 
                  );


 }
 get_res_update_model_close(js:any)
 {
   
   this.calculation();

   this.update_purchase_taxed_soft()


 }

 update_purchase_taxed_soft()
 {
  
  this.api.invo_head.cast = 3 ;
              this.invo_post_model = {
                head : this.api.invo_head
                    }
  this.api.update_purchase_taxed(this.invo_post_model)
  .subscribe((jsonData) => { this.get_res_post_pur_soft(jsonData)},(err) => console.error(err),);
    
 }

 get_res_post_pur_soft(js:any)
 {  
   alert(js.msg);  
 }






 keyup_net_price()
 {

 }
 keyup_net_price_e()
 {  
  if(this.pro_np_model != undefined)
  {
    this.pro_p_model  = this.pro_np_model * 100 / (100 + this.pro_tax_model)
    this.pro_p_model =  Math.round(this.pro_p_model * 100) / 100;
  }
  else
  {
    this.pro_p_model = 0;
  }
 }

 keyup_price_e()
 {
  if(this.pro_p_model != undefined)
  {
  this.pro_np_model = this.pro_p_model + ((this.pro_p_model * this.pro_tax_model)/100)
  this.pro_np_model = Math.round(this.pro_np_model * 100) / 100;
  }
  else
  {
    this.pro_np_model = 0;
  }
 }
 keyup_price()
 {
  if(this.pro_price != undefined)
   {
  this.pro_np = this.pro_price + ((this.pro_price * this.pro_tax)/100)
  this.pro_np = Math.round(this.pro_np * 100) / 100 
   }
 }
 update_purchase_taxed()
 {
  this.push_disabled_enter = 2;  
  this.api.invo_head.cast = 3 ;
              this.invo_post_model = {
                head : this.api.invo_head
                    }
  this.api.update_purchase_taxed(this.invo_post_model)
  .subscribe((jsonData) => { this.get_res_post_pur(jsonData)},(err) => console.error(err),);
    
 }

 get_res_post_pur(js:any)
 {
  this.push_disabled_enter = 3;
   alert(js.msg);
   setTimeout(() => 
   {
   
     this.rs.navigate(['/home/view-purchase']);
     
   },
   800);
 }




 change_in_ro()
 {
  this.calculation(); 

  this.api.invo_head.grand_amt = this.api.invo_head.grand_amt - this.api.frac;
   this.api.invo_head.round_off = this.api.frac;
   this.api.invo_head.due_amt = this.api.invo_head.grand_amt - this.api.invo_head.pre_cash_total;
   if(this.api.invo_head.due_amt <0)
   {
    this.api.invo_head.due_amt = 0;
   }
 }

 RemoveItem(item:any)
 {
   

     if(confirm("Are you sure to delete "+item.product_name)) {

       this.delete_item_model = {idx : item.idx,user :  this.api.user.user_role}
     
      this.api.delete_item_from_purchase(this.delete_item_model)
      .subscribe((jsonData) => { this.json_dels(jsonData,item.index_no)
                          },(err) => console.error(err));

    }


 }
 json_dels(data:any,index:number)
 {
  

   if(data.success == true)
   {
 

  this.api.Invoice_items_ary.splice(index-1, 1);
  for(var i = index-1 ; i < this.ia-1 ; i ++)
  {
   
    this.api.Invoice_items_ary[i].index_no =  this.api.Invoice_items_ary[i].index_no - 1;
    //this.api.Invoice_items_ary[i].idx =  this.api.Invoice_items_ary[i].idx - 1;
  }
  this.ia = this.ia - 1;
  this.calculation();
  this.update_purchase_taxed_soft();
   }
   else
   {
    alert(data.msg);
   }
  
 }

 
 editItem(index:any)
 {
  this.on_edit = true;
  this.ka = index;
  
  this.pro_name_model = this.api.Invoice_items_ary[index].product_name       
  this.pro_qty_model = this.api.Invoice_items_ary[index].qty
  this.pro_p_model = this.api.Invoice_items_ary[index].rate
  this.pro_np_model = this.api.Invoice_items_ary[index].value
  this.pro_tax_model = this.api.Invoice_items_ary[index].tax   

  this.myModal_3.style.display = "block";
  this._eq_e.nativeElement.focus();    
 }
 stack_push(si_no:number,pro_id:number,batch_id:number,free_qty:number,master_id:number,qty:number,rate:number,
  mrp:number,tax:number,pro_name:string,pro_np:number,pro_desc:any,hsn:string,idx:number)
 {
   this.api.Invoice_items_ary.push({"index_no":si_no,"product_id":pro_id,"batch_id":batch_id,
   "free_qty":free_qty,"master_id":master_id,
   "qty":qty,"rate":rate,"mrp":mrp ,"tax":tax,"product_name":pro_name,
   "unit":this.pro_unit,"value":pro_np,"product_description":null,"hsn_code": hsn,"idx":idx})
 }


 pushItem_down()
 {

  this.update_item_model = {master_id : this.api.invo_head.idx,index_no:this.ia+1,tax_rate : this.pro_tax,
    qty:this.pro_qty,rate:this.pro_price,value:this.pro_np,product_id:this.pro_id}                           
    this.api.add_new_item_to_purchase(this.update_item_model)
  .subscribe((jsonData) => { this.json_adds(jsonData)
                      },(err) => console.error(err));
  
 }

 json_adds(js:any)
 {
  
   if(js.success == false)
   {
     alert(js.msg);
   }
   if(js.success == true)
   {
    this.stack_push(this.ia+1,this.pro_id,null,0,0,this.pro_qty,this.pro_price,0,this.pro_tax,this.pro_name,this.pro_np,null,null,js.id);
    // this.api.Invoice_items_ary[this.ia+1].idx = js.id;
     this.ia = this.ia+1;   
     this._en.nativeElement.value = null 
     this._en.nativeElement.focus(); 
     this.push_disabled = true;
     this.calculation();
     this.update_purchase_taxed_soft();
     
   }
 }


 change_item_name(i_c:any)
 {

  let bi : any;                           
  bi = this.arrayOfKeyValues.filter(xi=> xi.bar_code  === i_c);      
                 
      if(bi.length == 1)
      {
 
       this.pro_id = bi[0].id;                
       this.pro_tax = bi[0].tax_rate;
       this.pro_name = bi[0].product_name;
       this.pro_barcode = i_c;                          
       this.pro_hsn = bi[0].hsn_code;   
       this.pro_unit = bi[0].hb7_unit.UQC_Code;                   
       this._eq.nativeElement.focus(); 
       this.check_for_duplication(bi[0].id)
 
       
       this.pro_qty = 1;
    
       this.push_disabled = false;
 
      }


 }
 move_to_round()
 {

 }

 
 check_for_duplication(id : number)
 {
   
 
 }
 print_reciepts(item:any)
 {
   
  this.api.cdmodels.serial_no = item.serial_no;
  this.api.cdmodels.amount = item.amount;
  this.api.cdmodels.date = item.date;
  this.api.cdmodels.pay_mode = item.mode;
  this.api.cdmodels.ref_no = item.ref_no;

  this.myModal_5.style.display = "none";
  
  this.api.query_demo.num_to_string = this.api.cdmodels.amount;
  

  this.api.get_figure(this.api.query_demo).subscribe((jsonData) => {   this.getjson877(jsonData)},(err) => console.error(err), ); 
   }
   getjson877 (p:any)
   {   
   this.api.cdmodels.figure_amt = p.msg;  
   setTimeout(() => 
   {
   
     window.print();
     
   },
   800);  
   }


 
  
 

 pre_pay_list()
 {
  this.myModal_5.style.display = "block";  
 }
 close_modal_tran_list()
 {
   this.myModal_5.style.display = "none"; 
 }

 remove_pre_reciepts(item:any)
 {
  
   if(confirm("Are you sure to delete " )) {   

     this.api.delete_a_reciept_from_invoice(item)
     .subscribe((jsonData) => { this.j_s(jsonData)
                         },(err:any) => console.error(err));           

   }
 }
 j_s(res:any)
 {
   alert(res.msg);
   
 }

 edit_pre_reciepts(item:any)
 {
   
       const dialogRef = this.dialog.open(Pre_pay_edit_component, {
         width: '80%',
         data: { data: item }
       });
       dialogRef.afterClosed().subscribe(result => {
         //this.fetchData();
       });
  

 }

 calculation()
 {


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
  
  this.api.invo_head.due_amt =     this.api.invo_head.grand_amt  -  this.api.invo_head.pre_cash_total; 
  if(this.api.invo_head.due_amt  > 0)
  {
   this.api.invo_head.balance_amt = 0
  }
  else
  {
   this.api.invo_head.balance_amt =  this.api.invo_head.pre_cash_total - this.api.invo_head.grand_amt;
  }


  
 }
  
}




@Component({
  selector: 'app-pre-pay-editor',
  templateUrl: './pre-pay-editor.html',
  styleUrls: ['./main.scss']
})
export class Pre_pay_edit_component implements OnInit {
  constructor(private router: Router, private apiService: ApiService, 
    public dialogRef_pew: MatDialogRef<Pre_pay_edit_component>, @Inject(MAT_DIALOG_DATA) public data_x: any, public dialog: MatDialog) {
      
        }

  ngOnInit(): void {
    
    
  }
  closeFunction()
  {
     this.dialogRef_pew.close();
  }
}



@Component({
  selector: 'app-pre-pay-adder',
  templateUrl: './pre-pay-adder.html',
  styleUrls: ['./main.scss']
})

export class Pre_pay_add_component implements OnInit {
  push_disabled_enter  : number = 1;
  add_amt : number;
  add_pay_model : any;
  mode : string = 'CASH';
  ref_no : string;
  date : Date = new Date();
  constructor(private router: Router, private api: ApiService, 
    public dialogRef_paya: MatDialogRef<Pre_pay_add_component>, @Inject(MAT_DIALOG_DATA) public data_x: any, public dialog: MatDialog) {
      
        }

  ngOnInit(): void {
    
    
  }
  add_new_single_payment()
  {
    this.add_pay_model = {master_id : this.data_x.data.master_id , cast : this.data_x.data.cast , is_bulk_pay: this.data_x.data.is_bulk_pay ,date:this.date,
       status: 1, amt : this.add_amt, mode : this.mode , type : 'DEBIT' , ref_no : this.ref_no}  
    if(confirm("Are you sure to add a payment " )) {
      this.push_disabled_enter = 2;   
      this.api.add_new_single_payment(this.add_pay_model)
      .subscribe((jsonData) => { this.j_s(jsonData)
                          },(err:any) => console.error(err));           
 
    }

  }
  j_s(res:any)
  {
    alert(res.msg);
    this.push_disabled_enter = 3; 
  }
  closeFunction()
  {
     this.dialogRef_paya.close();
  }
}