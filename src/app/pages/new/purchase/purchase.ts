import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { ShortcutInput, ShortcutEventOutput,KeyboardShortcutsComponent  } from "ng-keyboard-shortcuts";
import { required, requiredTrue,min, maxLength,isAlphabetical,isInteger} from 'ng-easy-validation';
import { pdt_model } from '../../../models/product';
import {AngularMyDatePickerDirective, DefaultView, IAngularMyDpOptions,IMyInputFieldChanged, 
  IMyDateModel, IMyMarkedDate, CalAnimation} from  'angular-mydatepicker';

  import {  DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './purchase.html',
  styleUrls: ['./purchase.scss'],
})
export class Purchase_Component implements OnInit {
  
  invo_post_model : any; 
  color : string ;
  myModal_3 : any;
  myModal_4 : any; 
  isPrint :boolean = true;
  Item_name : string;
  Item_id : number = 0;
  Item_hsn_code :  string = null;
  Item_mrp_value : number = 0;
  Item_qty : number = 0;
  Item_tax : number = 0;
  Item_net_price : number = 0;
  Item_price : number = 0;
  Item_stock : number = 0;
  Item_unit : string = '';
  Item_code : string = null;
  id_array : number[] = [];
  loop_var : number = 0;
  on_edit : boolean = false; 
  gst_code : string = '32';
  _d : number = 0;
  arr_ : number = 0;
  floor : number;
  frac : number;
  pro_id : number = 0;
  pro_catgery : string ;
  pro_hsn : string;
  pro_unit : string;
  pro_mrp : number;
  pro_tax : number;
  pro_np  : number;
  pro_cat : string;
  pro_qty : number = 1;
  pro_barcode : string;
  pro_price : number;
  pro_name : string;
  pro_free_qty : number;
  pro_name_model : string;
  b : number = 0;
  pro_p_model : number;
  pro_np_model : number;
  pro_qty_model : number;
  pro_tax_model : number;
  pro_np_tot_model : number;
  nun : number;
  nux : number;
  bill_cess : number = 0;
  isClickedOnce_on_Save : boolean = false;
  arrayOfKeyValues :  any [] =[];
  ia : number = 0;
  ka : number = 0;
  d_ : number = 0;
  is_date_changed :  boolean = false;
  dueStatus : number = 0;
  public invoice_date : Date = new Date();
  push_disabled : boolean = false;
  push_disabled_enter : number = 1;
  product_array : pdt_model[] =[];
  shortcuts: ShortcutInput[] = [];
  toogle_head_det : Boolean = false;
  arrayOfVendors : any [] = [];
  public disabled: boolean = true;
  public validDate: boolean = false;
  public model_date: IMyDateModel = null; 
  public inputText: string = "";
  requirements: any = {

    "Item_name": [
      { validator: required(), tooltipsOnInit: false }
    ],
   
    "Item_qty": [
      { validator: required(), tooltipsOnInit: true },
      { validator: min(0), tooltipsOnInit: true },
      { validator: isInteger(), tooltipsOnInit: true }
    ],
    "Item_net_price" : [
      { validator: required(), tooltipsOnInit: true },
      { validator: min(0), tooltipsOnInit: true },
      { validator: isInteger(), tooltipsOnInit: true }
    ]

  }

  tippyProps: any = {
    animation: 'fade',
    arrow: false,
    placement: 'bottom',
    role: 'tooltip',
    theme: 'translucent',
    zIndex: 9999,
  };

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
    disableSince: {year: 2028, month: 2, day: 2},
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

  @ViewChild("autos") _en: ElementRef; 
  @ViewChild('input') input: ElementRef; 
  @ViewChild("item_qty_model") _eq: ElementRef; 
  @ViewChild("item_qty_model_e") _eq_e: ElementRef; 
  @ViewChild("bill_round") _eq_b_r: ElementRef; 
  
  arrayOfproductValues : any = []
  public locale: string = 'en';
  constructor(       private rs: Router,public ds : DataService,public api : ApiService , private datepipe: DatePipe,
      private toastr: ToastrService,  private ps:NgxPermissionsService  ) {}

   ngOnInit(): void {
                      this.reset_items();
                      this.get_vendors();
                     
                      this.get_products();
                      this.get_all_products();

                      this.api.invo_head.invoice_date = this.invoice_date.toISOString(); 
                      this.api.invo_head.cus_id = 1;
                      this.api.invo_head.invoice_no_pur = null;
                      this.api.invo_head.round_off = 0;

                      this.myModal_3 = document.getElementById("myModal_3");
                      this.myModal_4 = document.getElementById("myModal_4");
                      this.ds.i_v.i = 0;
                      this.ds.i_m.tails.BAL_PAY = 0;
                      this.ds.i_v.k = 0;
                      this.shortcuts.push(
                        {
                          key: ["f2"],
                          label: "Purchase Entry",
                          description: "F2",
                          command: e => this.open_modal_2(),
                          preventDefault: true
                        },
                        {
                          key: ["f8"],
                          label: "Save Purchase",
                          description: "F8",
                          command: e => this.save_Purchase_taxed(),
                          preventDefault: true
                        },                      
                        {
                          key: ["shift + f2"],
                          label: "Close Purchase Menu",
                          description: "shift + F2",
                          command: e =>this.close_modal(),
                          preventDefault: true
                        },
                        {
                          key: ["f4"],
                          label: "Add New Product",
                          description: "F4",
                          command: (output: ShortcutEventOutput) =>
                          this.open_modal_4(),                            
                        },
                        {
                          key: ["f11"],
                          label: "Full screen",
                          description: "F11",
                          command: (output: ShortcutEventOutput) =>
                         this.open_nothing(),                            
                        },                       
                        {
                          key: ["shift + f4"],
                          label: "Close Add product menu",
                          description: "Shift + F4",
                          command: e =>this.close_modal_4() ,
                         
                          preventDefault: true
                        },
                      );    
                     
                                     
                    }                

                    onDateChanged(event: IMyDateModel): void {
                      console.log('onDateChanged(): ', event);  
                      this.api.invo_head.invoice_date = this.datepipe.transform(event.singleDate.jsDate,'yyyy-MM-dd'); 
                       console.log('dseee', this.api.invo_head.invoice_date )
                       this.is_date_changed = !this.is_date_changed;                                    
                       }

                    reset_items()
                    {

                      this.api.invo_head.ref_invoice_number = null; 
                      this.api.invo_head.ref_invoice_date = null; 
                      this.api.invo_head.recieved_amt = 0;
                      this.api.frac = 0;
                      while (this.api.Invoice_items_ary.length > 0) 
                      {
                        this.api.Invoice_items_ary.pop();                                                           
                      }  
                    }
                    change_item_name(i_c:any)
                    {
                      let bi : any;                           
                      bi = this.arrayOfKeyValues.filter(xi=> xi.bar_code  === i_c);      
                      console.log('bi',bi)                  
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

                       onDisableInput(checked: boolean) {
                        this.disabled = checked;
                      }
                      onInputFieldChanged(event: IMyInputFieldChanged): void {                        
                          this.validDate = event.valid;
                          this.inputText = event.value;
                        }

 keyup_price()
 {
   this.pro_np = this.pro_price + ((this.pro_price * this.pro_tax)/100)
   this.pro_np = Math.round(this.pro_np * 100) / 100
 }                       
 keyup_net_price()
 {
  
  this.pro_price  = this.pro_np * 100 / (100 + this.pro_tax)

   this.pro_price =  Math.round(this.pro_price * 100) / 100;

 }

 keyup_price_e()
 {
  this.pro_np_model = this.pro_p_model + ((this.pro_p_model * this.pro_tax_model)/100)
  this.pro_np_model = Math.round(this.pro_np_model * 100) / 100;

  this.pro_np_tot_model = this.pro_qty_model * this.pro_np_model;
 }

 keyup_net_price_e()
 {
  this.pro_p_model  = this.pro_np_model * 100 / (100 + this.pro_tax_model);
  this.pro_p_model =  Math.round(this.pro_p_model * 100) / 100;

  this.pro_np_tot_model = this.pro_qty_model * this.pro_np_model;
 
 }

 keyup_qty_e()
 {
   this.pro_np_tot_model = this.pro_qty_model * this.pro_np_model;
 }

 keyup_net_price_tot_e()
 {
  this.pro_np_model =  this.pro_np_tot_model / this.pro_qty_model;
  this.pro_p_model  = this.pro_np_model * 100 / (100 + this.pro_tax_model);
  this.pro_p_model =  Math.round(this.pro_p_model * 100) / 100;

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
this.product_array = json;
}

stack_push(si_no:number,pro_id:number,batch_id:number,free_qty:number,master_id:number,qty:number,rate:number,mrp:number,tax:number,pro_name:string,pro_np:number,pro_desc:any,hsn:string)
{
  this.api.Invoice_items_ary.push({"index_no":si_no,"product_id":pro_id,"batch_id":batch_id,
  "free_qty":free_qty,"master_id":master_id,
  "qty":qty,"rate":rate,"mrp":mrp ,"tax":tax,"product_name":pro_name,
  "unit":this.pro_unit,"value":pro_np,"product_description":null,"hsn_code": hsn,"idx":0})
}




 pushItem_down()
{
  
    this.stack_push(this.ia+1,this.pro_id,null,0,0,this.pro_qty,this.pro_price,0,this.pro_tax,this.pro_name,this.pro_np,null,null);
 

    this.ia = this.ia+1;   
    this._en.nativeElement.value = null 
    this._en.nativeElement.focus(); 
    this.push_disabled = true;
    this.calculation();
    this.pro_np = 0;
    this.pro_price = 0;
}


toogle_head_dets()
{
  this.toogle_head_det = !this.toogle_head_det;
}

customCallback(ev:any)
{
  alert('incorrect selection');
  this.reset_customer();
}

reset_customer()
{
  this.api.invo_head.customer_Name = null
  this.api.invo_head.customer_Address_1 = null
  this.api.invo_head.customer_Address_2 = null
  this.api.invo_head.customer_Address_3 = null
  this.api.invo_head.customer_Email = null
  this.api.invo_head.customer_Gstin = null 
  this.api.invo_head.customer_Ph1 = null
  this.api.invo_head.customer_Ph2 = null
  this.api.invo_head.cus_id = null
}


change_vendor_name(ev:any)
{

console.log('ev',ev);
  this.api.invo_head.cus_id = ev.id
 
  if(ev.id > 0)
  {
     
   
    this.api.invo_head.customer_Name = ev.name
    this.api.invo_head.customer_Address_1 = ev.street
    this.api.invo_head.customer_Address_2 = ev.address_1
    this.api.invo_head.customer_Address_3 = ev.address_2
    this.api.invo_head.customer_Email = ev.email
    this.api.invo_head.customer_Gstin = ev.gst_in 
  //  this.api.invo_head.cast = ev.cast

    this.gst_code = this.api.invo_head.customer_Gstin.substring(0, 2);
  

    if(this.gst_code != '32')
    {
      this.api.invo_head.type = 'IGST'
    }
    else{
      this.api.invo_head.type = 'B2B'
    }

    this.api.invo_head.customer_Ph1 = ev.ph
    this.api.invo_head.customer_Ph2 = ev.mob

      
          if(ev.cast == 1)
          { 
            if(ev.gst_in.length > 10)
            {
              this.api.invo_head.type = 'B2B'
            }
            else
            {
              this.api.invo_head.type = 'B2C'
            }             
            
          }
          else
          {
            if(ev.cast == 2)
          {
            this.api.invo_head.type = 'IGST'
          }
          else
          {
            if(ev.cast == 3)
            {
            this.api.invo_head.type = 'SEZ'
            }
            if(ev.cast == 4)
            {
            this.api.invo_head.type = 'B2C'
            }
          }
        }
     
  }
  else
  {
      
      alert('incorrect selection');
      this.reset_customer();
  }
}



     

    save_Purchase_taxed()
    {
  

      this.push_disabled_enter = 2;
      
      this.api.invo_head.mode = 'PUR' ;
      this.api.invo_head.status = 1 ;

      if(this.api.invo_head.recieved_amt > 0)
      {
        if(this.api.invo_head.due_amt > 0)
        {
          this.api.invo_head.white_flag = 2
        }
        else{
          this.api.invo_head.white_flag = 3
        } 
        
      }
      else
      {
        this.api.invo_head.white_flag = 1
      }

      this.api.invo_head.cast = 3 ;

      this.invo_post_model = {
        items : this.api.Invoice_items_ary,
        head : this.api.invo_head,
        cash_status : this.dueStatus,
      }


   
     

      this.api.post_purchase_taxed(this.invo_post_model)
      .subscribe((jsonData) => { this.get_res(jsonData)
                      },(err) => console.error(err),
                     
                      );

       
    }       
    
    get_res(json:any)
    {
      console.log('res',json)
     
      if(json.success == true)
      {
        alert(json.msg);
  
        this.rs.navigate(['/home/view-purchase']);
      }
      else
      {
        alert(json.msg);
  
        this.rs.navigate(['/home/dash']);
      }
    }


    open_nothing()
    {

    }

    get_all_products()
    {
    //   this.ds.get_all_products()
    //   .subscribe((jsonData) => { this.get_products_list(jsonData)
    //                   },(err) => console.error(err),
                     
    //                   );
    }

    get_products_list(json:any)
    {
      this.arrayOfproductValues = json;
    }
    
     
   
      focus_item()
      {

       

      

      }

      


  


      change_in_net_price_direct(np:number)
      {
       
         
        this._d = np * 100 / (100 + this.Item_tax); 
        
         this._d =  Math.round(this._d * 10000) / 10000;
       
        this.Item_price = this._d;

      }

      change_in_cess()
      {
         this.calculation();
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
      
      
      
      
          
 

      }

      move_to_round()
      {
          this._eq_b_r.nativeElement.focus();
      }
      change_in_ro()
      {
        this.calculation(); 
        this.api.invo_head.grand_amt = this.api.invo_head.grand_amt - this.api.frac;

        this.api.invo_head.round_off = this.api.frac;
        
      }

      change_in_payment()
      {
        this.calculation(); 
        this.change_in_ro();     
        
        this.api.invo_head.due_amt = this.api.invo_head.grand_amt  - this.api.invo_head.recieved_amt ;

        if(this.api.invo_head.due_amt > 0)
        {
          this.dueStatus = 2
        }
        else
        {
          this.dueStatus = 1
        }
       
        
      }

      snak_fun(msg:any)
      {
         alert(msg);
      }
      item_remove_flag()
      {

      }

      RemoveItem(index:any)
      {
        this.api.Invoice_items_ary.splice(index, 1);
        for(var i = index ; i < this.ia-1 ; i ++)
        {
          this.api.Invoice_items_ary[i].index_no =  this.api.Invoice_items_ary[i].index_no - 1;
        }
        this.ia = this.ia - 1;
        this.calculation();       
        
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

        this.pro_np_tot_model =  this.pro_np_model *   this.pro_qty_model;

        this.myModal_3.style.display = "block";
        this._eq_e.nativeElement.focus();       
        
      }

        check_for_duplication(id : number)
        {
          
        
        }


         

change_discount(dis_amt:number)
{
  //this.ds.i_m.tails.DISCOUNT_AMT = dis_amt;
  this.calculation();
}

        get_figure(x:any)
              {
                  
              //  this.ds.fig_model.number_to_convert = x;
               //  this.ds.get_figure(this.ds.fig_model)
               //  .subscribe((jsonData) => { this.getjson87(jsonData)
                        //            },(err) => console.error(err),
                                     
                       //             );

              }

      getjson87 (p:any)
      {
       // this.ds.fig_main = p.msg;   
       
      }



     

  

        open_modal_2()
        {
          this.myModal_3.style.display = "block";
          // this._el.nativeElement.focus();
  
        }
        open_modal_4()
        {
          this.myModal_4.style.display = "block";
        }
        close_modal()
        {
         
          this.api.Invoice_items_ary[this.ka].qty = this.pro_qty_model;
          this.api.Invoice_items_ary[this.ka].rate = this.pro_p_model;
          this.api.Invoice_items_ary[this.ka].value = this.pro_np_model; 
          this.calculation();
          this.myModal_3.style.display = "none";
          this._en.nativeElement.value = null;
          this._en.nativeElement.focus();
        }
        close_modal_4()
        {
          this.get_all_products()
          this.myModal_4.style.display = "none";
        }

      @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;  

}

