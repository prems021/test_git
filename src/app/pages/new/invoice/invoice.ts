import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import {AngularMyDatePickerDirective, DefaultView, IAngularMyDpOptions,IMyInputFieldChanged, 
  IMyDateModel, IMyMarkedDate, CalAnimation} from  'angular-mydatepicker';
  import { ShortcutInput, ShortcutEventOutput,KeyboardShortcutsComponent  } from "ng-keyboard-shortcuts";
  
  import {  DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-invoice',
  templateUrl: './invoice.html',
  styleUrls: ['./invoice.scss'],
})
export class Invoice_Component implements OnInit {

  rev_display : boolean = false;
  color : string ;
  Recieved_amt : number = 0;
  ia : number = 0;
  ka : number = 0;
  bi : any;
  items : any [] = [];
  print : boolean = false;
  pro_name : string; 
  pro_barcode : string;
  arrayOfKeyValues :  any [] =[];
  invo_post_model : any;
  mobile_view : boolean = false;
  push_disabled_mobile : boolean = false;
  eve_hand : any ;

  public disabled: boolean = true;
  public inputText: string = "";
  public validDate: boolean = false;
  public locale: string = 'en';
  public invoice_date : Date = new Date();
  selectedStatus :  number = 1;
  is_date_changed :  boolean = false;
  panelOpenState = false;
  CUS_MODEL : any = 'Cash';
  invo_type : number = 1;
  arrayOfCusValues : any [] = [];
  myModal_4 : any; 
  myModal_3 : any;


  

 

  push_disabled_enter : number = 1;
  push_disabled : boolean = false;

  pro_np  : number;
  pro_rate : number;
  pro_tax : number ;
  pro_id : number ;
  pro_mrp : number ;
  pro_mrp_model : number ;
  pro_hsn : string ;
  pro_unit : string;
  pro_description_model : string;
  pro_tax_model : number;
  pro_hsn_code_model : string;

  pro_np_model : number;
  pro_p_model : number;
  pro_qty_model : number;
  pro_qty : number = 1;
 
  pro_name_model : string;
  shortcuts: ShortcutInput[] = [];
  toogle_head_det : boolean = false;
  loop_var : number = 0;
  d_ : number = 0;

  pdt_tax_list_counter : number;

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
    disableSince: {year: 2024, month: 2, day: 2},
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
  @ViewChild("autos_lpo") _enlpo: ElementRef;
  @ViewChild("customers") _ec: ElementRef;
  @ViewChild("item_qty_model") _eq: ElementRef; 
  @ViewChild("item_mrp_model") _eq_mrp: ElementRef; 
  @ViewChild("item_qty_model_e") _eq_e: ElementRef; 
  @ViewChild("bill_pay") _en_b: ElementRef;
  @ViewChild("item_eq_mobile") _eq_mobile: ElementRef;  
  @ViewChild("box_rate_mobile") _box_rate_mobile: ElementRef;
  @ViewChild("autos_22") _en_mobile: ElementRef;
  pro_stock_qty: number;
  gst_slice: number = 32;
  

  constructor(   
    private rs: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService,
    public api : ApiService,
    public ds : DataService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {

    
 
    this.init_api_values();

    this.myModal_4 = document.getElementById("myModal_4");
    this.myModal_3 = document.getElementById("myModal_3");

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
        command: e => this.save_Invoice_taxed(),
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
        key: ["f9"],
        label: "Check Stock Qty",
        description: "F9",
        command: (output: ShortcutEventOutput) =>
        this.check_stock_qty(),
          
      },


      {
        key: ["f11"],
        label: "Full screen",
        description: "F11",
        command: (output: ShortcutEventOutput) =>
       this.open_nothing(),
          
      },

      {
        key: ["cmd + f7"],
        label: "Choose customer",
        description: "cmd  + f7",
        command: e =>this.choose_customer() ,
       
        preventDefault: true
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

                   init_api_values()
                   {

                    this.api.invo_head.type_ex = 'B2C';
                    this.mobile_view = false; 
                    this.api.invo_head.invoice_date = this.invoice_date.toISOString(); 
                    this.api.invo_head.cus_id = null;
                    this.api.invo_head.customer_Name = 'Cash';


                     while (this.api.Invoice_items_ary.length > 0) 
                     {
                       this.api.Invoice_items_ary.pop();
                                                           
                     }
                   
                     this.api.invo_head.mode = 'IN' ;
                     this.api.invo_head.type = 'B2C';
                     this.api.invo_head.type_ex = 'B2C';
                     this.api.invo_head.cast = 1 ;
                     this.api.invo_head.mode_of_pay = 1;
                     this.api.invo_head.recieved_amt = 0;
                     this.api.invo_head.due_amt = 0;
                     this.api.invo_head.balance_amt = 0; 
                     this.api.invo_head.grand_amt = 0; 
                     this.api.invo_head.ref_invoice_number = null; 
                     this.api.invo_head.ref_invoice_date = null; 
                     this.api.invo_head.total_taxable = 0;
                     this.api.invo_head.total_tax_amt = 0;
                     this.api.frac = 0;


                     this.get_customers_only();
                     this.get_products();
                   }

                 


 
             _cus_selected(ev:any)
                        {
                          
                         
                          if(ev.id == undefined || ev.id == undefined || ev.id <= 1 || ev.id == null )
                            {
                                          alert('Invalid Customer');                                        
                            }
                            else
                            {
                              
                                  this.toogle_head_det = true;
                                  this.api.invo_head.cus_id = ev.id;   
                                  this.api.invo_head.customer_Name = ev.name
                                  this.api.invo_head.customer_Address_1 = ev.street
                                  this.api.invo_head.customer_Address_2 = ev.address_1
                                  this.api.invo_head.customer_Address_3 = ev.address_2
                                  this.api.invo_head.customer_Email = ev.email
                                  this.api.invo_head.customer_Gstin = ev.gst_in
                                  this.api.invo_head.customer_Ph1 = ev.ph
                                  this.api.invo_head.customer_Ph2 = ev.mob

                              if(ev.cast == 1 && ev.gst_in != null)
                              {  
  
                               if(ev.gst_in.length == 15)
                                    {  
                                      
                                      this.api.invo_head.type_ex = 'B2B'; 
                                      let result = this.api.invo_head.customer_Gstin.slice(0, 2);
                                      const msd =  this.api.state_list.filter(xy=>xy.state_code == result);                                                          
                                                               if(msd.length <= 0)
                                                                {
                                                                 alert('invalid Gst code')
                                                                }
                                                               else
                                                                {
                                                                  this.api.state_code = msd[0].state_code;
                                                                  this.api.state_name = msd[0].state_name;                                                                 
                                                                }

                                                               setTimeout(() => 
                                                               {                                                               
                                                                this._enlpo.nativeElement.focus();                                                                  
                                                               },
                                                               800);                                                              
                                                              
                          
                                      
                                    }
                                    else
                                    {
                                            if(ev.gst_in.length >= 1 )
                                            {                                
                                              alert('Invalid Gst No')
                                            }
                                            else
                                            {
                                              
                                              this.api.invo_head.type_ex = 'B2C'; 
                                              setTimeout(() => 
                                              {                                                               
                                              this._enlpo.nativeElement.focus();                                                                  
                                              },
                                              800);
                                            }
                                    }

                              }

                              if(ev.cast == 1 && ev.gst_in == null)
                              {                                
                                this.api.invo_head.type_ex = 'B2C'; 
                                setTimeout(() => 
                                {                                                               
                                 this._enlpo.nativeElement.focus();                                                                  
                                },
                                800);
                              }

                              


                              if(ev.cast == 2)
                                      {  
                                                                                    
                                             this.api.invo_head.type_ex = 'IGST'; 
                                             let result = this.api.invo_head.customer_Gstin.slice(0, 2);
                                             const msd =  this.api.state_list.filter(xy=>xy.state_code == result);                                                          
                                                                      if(msd.length <= 0)
                                                                       {
                                                                        alert('invalid Gst codes')
                                                                      }
                                                                      else
                                                                       {
                                                                         this.api.state_code = msd[0].state_code;
                                                                         this.api.state_name = msd[0].state_name;                                                                 
                                                                      }
                                                                      
                                                                      setTimeout(() => 
                                                                      {                                                               
                                                                       this._enlpo.nativeElement.focus();                                                                  
                                                                      },
                                                                      800);
                                      }
                              if(ev.cast == 3)
                                      {   
                                               
                                              this.api.invo_head.type_ex = 'SEZ'; 
                                              let result = this.api.invo_head.customer_Gstin.slice(0, 2);
                                              const msd =  this.api.state_list.filter(xy=>xy.state_code == result);                                                          
                                                                       if(msd.length <= 0)
                                                                        {
                                                                         alert('invalid Gst codes')
                                                                       }
                                                                       else
                                                                        {
                                                                          this.api.state_code = msd[0].state_code;
                                                                          this.api.state_name = msd[0].state_name;                                                                 
                                                                       }
                                                                     
                                                                       setTimeout(() => 
                                                                       {                                                               
                                                                        this._enlpo.nativeElement.focus();                                                                  
                                                                       },
                                                                       800);  
                                      }
                  
                              if(ev.cast == 5)
                                    {   
                                       
                                       this.api.invo_head.type_ex = 'INTL';  
                                      
                                       setTimeout(() => 
                                       {                                                               
                                        this._enlpo.nativeElement.focus();                                                                  
                                       },
                                       800);
                                    }

                            }                               

                        }
           

            customCallback(e:any)
            {
              alert('Incorrect selection')
            }

            choose_customer()
            {
              console.log('hre');
              this._ec.nativeElement.value = null;
              this._ec.nativeElement.focus();
            }


            change_item_name(i_c:any)
            {         
                                         
                        this.bi = this.arrayOfKeyValues.filter(xi=> xi.bar_code  === i_c);      
                        
                        if(this.bi.length == 1)
                          {                  

                            this.check_for_duplication(this.bi[0].id);                   
                          
                          }
                          if(this.bi.length > 1)
                          {
                            this.toastr.error('More than One Product has the same barcode..');
                          }
                          if(this.bi.length == 0)
                          {
                              this.toastr.error('Invalid product / bar code ..');
                          }
            }

                check_for_duplication(id : number)
                {
                 
                  const index = this.api.Invoice_items_ary.findIndex(xx=>xx.product_id == id)
                  if(index != -1){
                    this.myModal_3.style.display = "block";   
                    console.log('Found',index)
                    this.ka = index;
                    this.pro_name_model = this.api.Invoice_items_ary[this.ka].product_name
                    this.pro_qty_model = this.api.Invoice_items_ary[this.ka].qty
                    this.pro_p_model = this.api.Invoice_items_ary[this.ka].rate
                    this.pro_mrp_model = this.api.Invoice_items_ary[this.ka].mrp
                    this.pro_np_model = this.api.Invoice_items_ary[this.ka].value
                    this.pro_tax_model = this.api.Invoice_items_ary[this.ka].tax
                    this.pro_description_model = this.api.Invoice_items_ary[this.ka].product_description;
                    this.pro_hsn_code_model = this.api.Invoice_items_ary[this.ka].hsn_code;        
                    this._eq_e.nativeElement.focus();                    
                  }
                  else
                  {
                    this.pro_id = this.bi[0].id;
                    this.pro_hsn = this.bi[0].hsn_code;
                    this.pro_name = this.bi[0].product_name
                    this.pro_mrp = this.bi[0].mrp;
                    this.pro_rate = this.bi[0].rate;
                    this.pro_tax = this.bi[0].tax_rate;
                    this.pro_unit = this.bi[0].hb7_unit.UQC_Code;  
                    this.pro_qty = 1;     
                    if(this.api.invo_head.type_ex  != 'SEZ')
                    {
                        this.pro_np = this.pro_rate + ((this.pro_rate * this.pro_tax)/100);
                        this.pro_np =   Math.round(this.pro_np  * 100) / 100;
                    }         
                    else
                    {                      
                      this.pro_np =  this.bi[0].rate ;
                      this.pro_tax = 0;
                    }                     
                    this.push_disabled_mobile = false;
                    this.push_disabled = false;
                    this._eq_mrp.nativeElement.focus(); 
                  }                
                  
                  
                }




                keyup_net_price()
                {
                      if(this.api.invo_head.type_ex  == 'SEZ')
                      {
                        this.pro_rate = this.pro_np;
                      }
                      else
                      {
                        this.pro_rate  = this.pro_np * 100 / (100 + this.pro_tax)
                        this.pro_rate =  Math.round(this.pro_rate * 100) / 100;
                      }
                }
                keyup_rate()
                {
                        if(this.api.invo_head.type_ex  == 'SEZ')
                        {
                          this.pro_np = this.pro_rate;
                        }
                        else
                        {
                          this.pro_np = this.pro_rate + ((this.pro_rate * this.pro_tax)/100)
                          this.pro_np = Math.round(this.pro_np * 100) / 100
                        }
                
                }


                pushItem_down()
                {
                   if(this.push_disabled ==  false)
                   {
                  this.stack_push(this.ia+1,this.pro_id,0,0,0,this.pro_qty,this.pro_rate,this.pro_mrp,this.pro_tax,
                    this.pro_name,this.pro_np,null,this.pro_hsn);            
                  this.ia = this.ia+1;                  
                  this.push_disabled = true;
                        
                  setTimeout(() => 
                  {                 
                   this.calculation();                   
                  },
                  200);  

                 setTimeout(() => 
                 {                 
                  this._en.nativeElement.value = null 
                  this._en.nativeElement.focus();                    
                 },
                 200);
                 }

                
                }
                stack_push(si_no:number,pro_id:number,batch_id:number,free_qty:number,
                  master_id:number,qty:number,rate:number,mrp:number,tax:number,pro_name:string,pro_np:number,pro_desc:any,hsn:string)
                {
                  this.api.Invoice_items_ary.push({"index_no":si_no,"product_id":pro_id,"batch_id":batch_id,
                  "free_qty":free_qty,"master_id":master_id,
                  "qty":qty,"rate":rate,"mrp":mrp ,"tax":tax,"product_name":pro_name,
                  "unit":this.pro_unit,"value":pro_np,"product_description":null,"hsn_code": hsn,"idx":0})
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
                        this.d_ = (this.api.Invoice_items_ary[this.loop_var].rate *  this.api.Invoice_items_ary[this.loop_var].tax/100 ) * this.api.Invoice_items_ary[this.loop_var].qty;          
                        this.api.invo_head.total_tax_amt = this.api.invo_head.total_tax_amt + this.d_;         
                        this.api.invo_head.total_taxable =   this.api.invo_head.total_taxable +                                                             
                                         (this.api.Invoice_items_ary[this.loop_var].rate * this.api.Invoice_items_ary[this.loop_var].qty)          
                         
                      }
                   this.api.invo_head.total_taxable = Math.round(  this.api.invo_head.total_taxable * 100) / 100;          
                   this.api.mrp_total  = Math.round(  this.api.mrp_total  * 100) / 100;          
                   this.api.invo_head.grand_amt =  (this.api.invo_head.total_taxable + this.api.invo_head.total_tax_amt);          
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
          























            close_modal_4()
                 {
                       // this.get_all_products()
                            this.myModal_4.style.display = "none";
                  }






                          update_close_modal()
                          {
                           
                             this.api.Invoice_items_ary[this.ka].qty = this.pro_qty_model;
                             this.api.Invoice_items_ary[this.ka].rate = this.pro_p_model;
                             this.api.Invoice_items_ary[this.ka].value = this.pro_np_model; 
                             this.api.Invoice_items_ary[this.ka].product_description  = this.pro_description_model;
                             this.calculation();
                             this.myModal_3.style.display = "none";
                             this._en.nativeElement.value = null;
                             this._en.nativeElement.focus();
                            
                          }

                          keyup_net_price_e()
                          {
                             
                          if(this.api.invo_head.type_ex  == 'SEZ')
                          {
                            this.pro_p_model =  this.pro_np_model;
                          }
                          else
                          {
                           this.pro_p_model  = this.pro_np_model * 100 / (100 + this.pro_tax_model);
                            this.pro_p_model =  Math.round(this.pro_p_model * 100) / 100;
                         
                          }
                         
                          }

                          keyup_price_e()
                          {
                         
                           if(this.api.invo_head.type_ex  == 'SEZ')
                           {
                             this.pro_np_model = this.pro_p_model
                           }
                           else
                           {       
                            
                             this.pro_np_model = this.pro_p_model + ((this.pro_p_model * this.pro_tax_model)/100)
                             this.pro_np_model = Math.round(this.pro_np_model * 100) / 100;
                         
                           }
                         
                          
                          }

                          toogle_head_dets()
                          {
                             this.toogle_head_det = !this.toogle_head_det
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
                          
                          save_Invoice_taxed_mobile()
                          {
                            this.mobile_view = true;
                            this.save_Invoice_taxed();
                            console.log('....knok');
                          }
                        

                          save_Invoice_taxed()
                          {
                            this.change_in_payment();
                            
                            this.api.invo_head.status = 1;  
                            
                            if(this.api.invo_head.cus_id == NaN || this.api.invo_head.cus_id == undefined || this.api.invo_head.cus_id <= 1 || this.api.invo_head.cus_id == null )
                            {
                             alert('Invalid customer Name')
                            }
                         
                          else

                          {
                           
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

                       if(this.api.invo_head.type_ex == 'B2C')
                          {             
                            this.api.invo_head.type = 'B2C';                       
                          }
                            else
                          {                                                   
                              this.api.invo_head.type = 'B2B';
                          } 
                       

                       this.api.post_invoice_taxed(this.invo_post_model)
                       .subscribe((jsonData) => { this.get_res(jsonData)
                                       },(err) => console.error(err),                                           
                                      );
                    
                    
                       }






                    
                          get_res(json:any)
                          {

                            console.log('res_su',json)
                            this.push_disabled_enter = 3;                            
                              
     
                              if(json.success == true)
                              {

                                this.api.invo_head.invoice_no_genrated  = json.mas_id;
                                this.api.invo_head.invoice_uid_genrated  = json.u_id;

                                if(this.mobile_view == true)
                                {
                                  setTimeout(() => 
                                {
                                
                                  this.rs.navigate(['/home/new']);
                                  
                                },
                                2000);

                                }
                                else {

                                  if(this.api.Company_dets.default_print_type == 9 && this.api.Company_dets.default_print_size == 'a4')
                                  {
                                    this.print = true;
     
                                  setTimeout(() => 
                                  {
                                  
                                    this.rs.navigate(['/home/new']);
                                    
                                  },
                                  4000);
     
                                  }
                                   else{

                                    setTimeout(() => 
                                    {
                                    
                                      window.print();
                                      
                                    },
                                    800);

                                    setTimeout(() => 
                                    {
                                    
                                      this.rs.navigate(['/home/new']);
                                      
                                    },
                                    4000);


                                  }

                              }




                              this.api.post_wa_msg(this.api.invo_head.customer_Ph1, this.api.invo_head.invoice_uid_genrated)
                              .subscribe((jsonData) => { console.log(jsonData)
                                              },(err:any) => console.error(err),                                           
                                             );

                               




     
                             }
                             else{
                               alert('Errors in entry ..... ')
                             }
                        
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
                       // this.pdt_tax_list[0] = data.items[0].TAX
                        this.ds.push_tax_info();
                        this.ds.Tax_info.item[0].TAX = data[0].tax
                        this.ds.Tax_info.item[0].PRICE = data[0].rate;
                        this.ds.Tax_info.item[0].NET_VALUE = data[0].rate * data[liss].qty;
                        this.ds.Tax_info.item[0].CGST =  (this.ds.Tax_info.item[0].NET_VALUE *  (this.ds.Tax_info.item[0].TAX)/2) / 100;
                        this.ds.Tax_info.item[0].SGST = (this.ds.Tax_info.item[0].NET_VALUE *  (this.ds.Tax_info.item[0].TAX)/2) / 100;
                      
                        // if(this.ds.Tax_info.item[0].TAX > 5 && this.ds.i_m.heads.TYPE_ === 'B2C')
                        // {
                        //   this.ds.Tax_info.item[0].KFC =  ( this.ds.Tax_info.item[0].NET_VALUE ) / 100;
                        // }
                  
                  
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
           
          // if(this.ds.Tax_info.item[this.pdt_tax_list_counter].TAX > 5 && this.ds.i_m.heads.TYPE_ === 'B2C')
          // {
          //   this.ds.Tax_info.item[this.pdt_tax_list_counter].KFC =  temp_net_val / 100;
          // }
          
          
          this.pdt_tax_list_counter = this.pdt_tax_list_counter + 1;
        }
      
        else
        {
          
          this.ds.Tax_info.item[in_tax].NET_VALUE = this.ds.Tax_info.item[in_tax].NET_VALUE + data[liss].rate * data[liss].qty;
          this.ds.Tax_info.item[in_tax].CGST =  (this.ds.Tax_info.item[in_tax].NET_VALUE *  (this.ds.Tax_info.item[in_tax].TAX)/2) / 100;
          this.ds.Tax_info.item[in_tax].SGST =  (this.ds.Tax_info.item[in_tax].NET_VALUE *  (this.ds.Tax_info.item[in_tax].TAX)/2) / 100;
          // if(this.ds.Tax_info.item[in_tax].TAX > 5 && this.ds.i_m.heads.TYPE_ === 'B2C')
          // {
          //   this.ds.Tax_info.item[in_tax].KFC =   this.ds.Tax_info.item[in_tax].NET_VALUE  / 100;
          // }
          
    
        }
    
    
    
      }
    }
    console.log('list',this.ds.Tax_info);


    
    }


                          a4_checked()
                          {

                          }

                          a5_checked()
                          {

                          }
                          _80_checked()
                          {

                          }
                          swap_vert()
                          {
                            this.rev_display = !this.rev_display;
                          }

                          RemoveItem_rev(item:any)
                          {
                            console.log('item',item)
                            this.ka = item.index_no-1;  

                            this.api.Invoice_items_ary.splice(this.ka, 1);
                            for(var i = this.ka ; i < this.ia-1 ; i ++)
                            {
                              this.api.Invoice_items_ary[i].index_no =  this.api.Invoice_items_ary[i].index_no - 1;
                            }
                            this.ia = this.ia - 1;
                            this.calculation(); 
                          }

                          RemoveItem(index:number)
                          {
                            
                            this.api.Invoice_items_ary.splice(index, 1);
                            for(var i = index ; i < this.ia-1 ; i ++)
                            {
                              this.api.Invoice_items_ary[i].index_no =  this.api.Invoice_items_ary[i].index_no - 1;
                            }
                            this.ia = this.ia - 1;
                            this.calculation();                          
                          }

                          arrange_items()
                          {

                          }

                          
                          editItem(index:number)
                          {
                           
                            this.ka = index;                    
                            this.pro_name_model = this.api.Invoice_items_ary[index].product_name
                            this.pro_description_model = this.api.Invoice_items_ary[index].product_description
                            this.pro_qty_model = this.api.Invoice_items_ary[index].qty
                            this.pro_p_model = this.api.Invoice_items_ary[index].rate
                            this.pro_np_model = this.api.Invoice_items_ary[index].value
                            this.pro_tax_model = this.api.Invoice_items_ary[index].tax
                            this.pro_hsn_code_model = this.api.Invoice_items_ary[index].hsn_code;                   
                            this.myModal_3.style.display = "block";                   
                            this._eq_e.nativeElement.focus();                     
                            this.calculation();               
                          }
                             editItem_rev(item:any)
                           {
                           console.log('item',item)
                             this.ka = item.index_no-1;                    
                            this.pro_name_model = this.api.Invoice_items_ary[this.ka].product_name
                            this.pro_description_model = this.api.Invoice_items_ary[this.ka].product_description
                            this.pro_qty_model = this.api.Invoice_items_ary[this.ka].qty
                            this.pro_p_model = this.api.Invoice_items_ary[this.ka].rate
                            this.pro_np_model = this.api.Invoice_items_ary[this.ka].value
                            this.pro_tax_model = this.api.Invoice_items_ary[this.ka].tax
                            this.pro_hsn_code_model = this.api.Invoice_items_ary[this.ka].hsn_code;                     
                            this.myModal_3.style.display = "block";                   
                            this._eq_e.nativeElement.focus();                     
                            this.calculation();               
                           }

                          pushItem_down_mobile()
                          {
                            this.stack_push(this.ia+1,this.pro_id,0,0,0,this.pro_qty,this.pro_rate,this.pro_mrp,this.pro_tax,
                              this.pro_name,this.pro_np,null,this.pro_hsn);
                      
                            this.ia = this.ia+1;   
                            this._en_mobile.nativeElement.value = null 
                            this._en_mobile.nativeElement.focus(); 
                            this.push_disabled_mobile = true;
                            this.calculation();
                           
                          }


                          check_stock_qty()
                          {
                            if(this.pro_id == null || this.pro_id == NaN || this.pro_id <= 0 )
                            {
                              this.toastr.error('select any Product');
                            }
                            else
                            {
                              this.api.get_stock_qty(this.pro_id).subscribe((jsonData) => { this._get_stock_qty_value(jsonData)
                              },(err:any) => console.error(err));
                            }
                      
                   
                          }

                          _get_stock_qty_value(data :any)
                          {   
                              console.log('res......',data);
                              this.pro_stock_qty = 0;
                              this.pro_stock_qty = (data.op_bal + data.pur_tot + data.sales_ret_tot) - (data.purchase_ret_tot +  data.sales_tot)                           
                              this.toastr.success('Qty On Stock  '+this.pro_stock_qty);
                          }




                       
                         
                         

                          keyup_tax()
                          {

                          }

                          move_to_payment()
                          {

                           // this._en_b.nativeElement.value = 0;
                            this._en_b.nativeElement.focus();
                            this.change_in_payment();

                          }

                          enter_mobile_item()
                          {
                            this._eq_mobile.nativeElement.focus(); 
                          }

                          value_changed_mobile(event:any)
                          {
                            if(event.id == undefined)
                            {
                               
                            }
                            else
                            {
                                this.check_for_duplication(event.id);
                                this.pro_id = event.id;
                                this.pro_hsn = event.hsn_code;
                                this.pro_name = event.product_name
                                this.pro_mrp = event.mrp;
                                this.pro_rate = event.rate;
                                this.pro_tax = event.tax_rate;
                                this.pro_unit = event.hb7_unit.UQC_Code;  
                                this.pro_qty = 1;  
                                
                                
                                

                                    if(this.api.invo_head.type_ex  != 'SEZ')
                                    {
                                        this.pro_np = event.rate + ((event.rate * event.tax_rate)/100);
                                        this.pro_np =   Math.round(this.pro_np  * 100) / 100;
                                    }
                          
                                    else
                                    {
                                      
                                      this.pro_np =  event.rate ;
                                      this.pro_tax = 0;
                                    } 
                                    
                                   
                            }
                            
                            // console.log('event',event);
                            // this.eve_hand = event
                          


                          }

                          custom_selsected_mobile(even:any)
                          {
                            console.log('event',even);
                            alert('select item from list');
                           
                          }

                      

                              open_modal_2()
                              {
                                this.myModal_3.style.display = "block";
                                // this._el.nativeElement.focus();
                        
                              }
                              open_modal_4()
                              {
                                console.log('trr.......')
                                this.myModal_4.style.display = "block";
                              }
                              open_nothing()
                              {
                          
                              }


                            

                              get_customers_only()
                              {
                                 this.api.cus_vendor_list_filter_cus_only()
                                .subscribe((jsonData) => { this.json_customers(jsonData)
                                                    },(err) => console.error(err),);
                              }
                              
                              json_customers(json :any)
                                {    
                                this.arrayOfCusValues = json;    
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

                               
   

 
      onDateChanged(event: IMyDateModel): void {
                       
        this.api.invo_head.invoice_date = this.datepipe.transform(event.singleDate.jsDate,'yyyy-MM-dd'); 
       // this.api.invo_head.invoice_date = event.singleDate.jsDate.toISOString();
              this.is_date_changed = !this.is_date_changed;
      }
      onInputFieldChanged(event: IMyInputFieldChanged): void {
         this.validDate = event.valid;
         this.inputText = event.value;
       }                      
   
  
}
