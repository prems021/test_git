
  


 
   
  
  import { Component, OnInit,ViewChild,ElementRef,Inject  } from '@angular/core';

  import { Router } from '@angular/router';
  import { NgxPermissionsService } from 'ngx-permissions';
  import { ToastrService } from 'ngx-toastr';
  import { ApiService } from '../../../services/api.service';
  import { DataService } from '../../../services/data.service';
  import {AngularMyDatePickerDirective, DefaultView, IAngularMyDpOptions,IMyInputFieldChanged, 
    IMyDateModel, IMyMarkedDate, CalAnimation} from  'angular-mydatepicker';
    import { ShortcutInput, ShortcutEventOutput,KeyboardShortcutsComponent  } from "ng-keyboard-shortcuts";

    import {  DatePipe } from '@angular/common';
    import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
    
  
  @Component({
    selector: 'app-update-invoice',
    templateUrl: './main.html',
    styleUrls: ['./main.scss'],
  })
  export class Invoice_update_Component implements OnInit {
  
    Recieved_amt : number = 0;
    ia : number = 0;
    ka : number = 0;
    items : any [] = [];
    pro_name : string; 
    pro_barcode : string;
    arrayOfKeyValues :  any [] =[];
    invo_post_model : any;
    color : string ;
    rev_display : boolean = false;
    print : boolean = false;
  
    public disabled: boolean = true;
    public inputText: string = "";
    public validDate: boolean = false;
    public locale: string = 'en';
    public invoice_date : Date = new Date();
    selectedStatus :  number = 1;
    is_date_changed :  boolean = false;
    public date_edit : boolean = false;
    panelOpenState = false;
    CUS_MODEL : any;
    invo_type : number = 1;
    arrayOfCusValues : any [] = [];
    myModal_4 : any; 
    myModal_3 : any;
    myModal_5 : any;

   
    
    _80_print : boolean = false;
    a5_print : boolean = false;
    a4_print : boolean = true;
    push_disabled_enter : number = 0;
    push_disabled : boolean = false;
    cus_edit : boolean = false;
  
    pro_np  : number;
    pro_rate : number;
    pro_tax : number ;
    pro_id : number ;
    pro_mrp : number ;
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
    get_res_bill_flag : boolean = false
    update_item_model :any;
    pdt_tax_list_counter : number;
    uu : number = 0;
    adv_cash : number = 0;
    
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
  
    @ViewChild("autos") _en: ElementRef;
    @ViewChild("customers") _ec: ElementRef;
    @ViewChild("item_qty_model") _eq: ElementRef; 
    @ViewChild("item_qty_model_e") _eq_e: ElementRef; 
    @ViewChild("bill_pay") _en_b: ElementRef;
    uun: number;
    print_cash_reciept_flag: number = 0;
    pro_stock_qty: number = 0;
  
    constructor(   
      private rs: Router,
      private toastr: ToastrService,
      private ps:NgxPermissionsService,
      public api : ApiService,
      public ds : DataService,
      private datepipe: DatePipe,
      public dialog: MatDialog   
    ) {}
  
  
    
     
   
     
    
  
    ngOnInit(): void {

      this.api.invo_head.ref_invoice_number = null; 
      this.api.invo_head.ref_invoice_date = null; 
      this.api.invo_head.pre_cash_total = 0;
      this.api.state_code = null;
      this.api.state_name = null;
          this.get_a_invoice_detail()
           this.get_products();
         
  
           while (this.api.Invoice_items_ary.length > 0) 
           {
             this.api.Invoice_items_ary.pop();                                               
           }
  
      this.myModal_4 = document.getElementById("myModal_4");
      this.myModal_3 = document.getElementById("myModal_3");
      this.myModal_5 = document.getElementById("myModal_5");
    
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
          command: e => this.update_Invoice_taxed(),
          preventDefault: true
        },
      
        {
          key: ["f9"],
          label: "Check Stock Qty",
          description: "F9",
          command: (output: ShortcutEventOutput) =>
          this.check_stock_qty(),
            
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
          key: ["shift + f7"],
          label: "Choose customer",
          description: "shift  + f7",
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
  
                   
  
    onDateChanged(event: IMyDateModel): void {
                      
                          
                           this.api.invo_head.invoice_date = this.datepipe.transform(event.singleDate.jsDate,'yyyy-MM-dd');                     
                          
                           this.is_date_changed = !this.is_date_changed;
                           this.date_edit = !this.date_edit;
  
                           this.api.change_invoice_date(this.api.invoice_id,this.datepipe.transform(event.singleDate.jsDate,'yyyy-MM-dd'))
                           .subscribe((jsonData) => { this.get_res_dc(jsonData)},(err) => console.error(err),);
                          
  
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

                         get_res_cc(resp:any)
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

                         swap_vert()
                         {
                           this.rev_display = !this.rev_display;
                         }

                         onInputFieldChanged(event: IMyInputFieldChanged): void {
                        
                            this.validDate = event.valid;
                            this.inputText = event.value;
                          }
  
                          get_all_trans_detail()
                          {
                              this.api.get_all_trans_detail_of_a_invoice_inclu_adv(this.api.invoice_id) 
                              .subscribe((jsonData) => { this.get_res_trans(jsonData)
                              },(err) => console.error(err),                                           
                             );
                          }
                          get_res_trans(xxy:any)
                          {

                       
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
                              this.api.invo_head.invoice_no_genrated  = data.invoice_no;
                              this.api.invo_head.customer_Name = data.hb7_customer.name;
                              this.api.invo_head.customer_Address_2 = data.hb7_customer.address_1
                              this.api.invo_head.customer_Address_3  = data.hb7_customer.address_2
                              this.api.invo_head.customer_Ph1 = data.hb7_customer.ph 
                              this.api.invo_head.customer_Ph2 = data.hb7_customer.mob
                              this.api.invo_head.customer_Address_1 = data.hb7_customer.street
                              this.api.invo_head.customer_Gstin = data.hb7_customer.gst_in

                               
                              if(this.api.invo_head.customer_Gstin == null)
                              {
                                this.api.invo_head.type_ex  = 'B2C';
                              } 
                              else
                              {
                                if(this.api.invo_head.customer_Gstin.length > 12)
                                {
                                  if(data.hb7_customer.cast == 1)
                                  {
                                    this.api.invo_head.type_ex  = 'B2B';
                                  }

                                  if(data.hb7_customer.cast == 2)
                                  {
                                    this.api.invo_head.type_ex  = 'IGST';
                                  }

                                  if(data.hb7_customer.cast == 3)
                                  {
                                    this.api.invo_head.type_ex  = 'SEZ';
                                  }
                                  if(data.hb7_customer.cast == 5)
                                  {
                                    this.api.invo_head.type_ex  = 'INTL';
                                  }
                                 

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
                                }
                                else
                                {
                                  this.api.invo_head.type_ex  = 'B2C';
                                  let result = this.api.Company_dets.company_gstin.slice(0, 2);
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
                                }
                              }
      



                               if(this.api.invo_head.customer_Gstin != null)
                               {
       
                               if(this.api.invo_head.customer_Gstin.length > 12)
                                {
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

                                }
                                else
                                {
                                 

                                  let result = this.api.Company_dets.company_gstin.slice(0, 2);
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


                                }

                              }

                          
                              this.api.invo_head.cast = data.cast;



                              this.api.invo_head.customer_Email = data.hb7_customer.email
                              this.api.invo_head.cus_id = data.hb7_customer.id;
                              this.api.invo_head.recieved_amt = 0;
                              this.api.invo_head.pos = data.pos;
                              this.api.invo_head.lpo_no = data.lpo_no;

                              this.api.invo_head.mode_of_supply = data.mode_of_supply;
                              this.api.invo_head.bundles = data.bundles;
                                                      
                              this.api.invo_head.due_amt = 0;
                         
                              this.api.invo_head.idx = data.id;
                              this.CUS_MODEL = {id:data.hb7_customer.id, com_id:data.hb7_customer.com_id , gst_in: data.hb7_customer.gst_in, name: data.hb7_customer.name, street:data.hb7_customer.street ,
                              address_1: data.hb7_customer.address_1,address_2:data.hb7_customer.address_2,cast:data.hb7_customer.cast,createdAt:"2021-08-12T05:54:30.000Z",credit_balance:data.hb7_customer.credit_balance,
                              email:data.hb7_customer.email,mob:data.hb7_customer.mob,opening_balance:data.hb7_customer.opening_balance,ph:data.hb7_customer.ph,type:data.hb7_customer.type,updatedAt: "2021-08-27T10:42:48.000Z"}
                            
  
                                for(var i = 0; i<data.hb7_invoice_details.length;i++)
                                {
  
                                  this.pro_np = data.hb7_invoice_details[i].rate + ((data.hb7_invoice_details[i].rate * data.hb7_invoice_details[i].tax)/100)
                                  this.pro_np = Math.round(this.pro_np * 100) / 100;
                                
  
                                   this.stack_push(data.hb7_invoice_details[i].index_no,data.hb7_invoice_details[i].product_id,0,0,0,data.hb7_invoice_details[i].qty,
                                    data.hb7_invoice_details[i].rate,data.hb7_invoice_details[i].mrp,data.hb7_invoice_details[i].tax,
                                    data.hb7_invoice_details[i].Hb7_product.product_name,this.pro_np,data.hb7_invoice_details[i].product_description,data.hb7_invoice_details[i].Hb7_product.hsn_code,
                                    data.hb7_invoice_details[i].Hb7_product.hb7_unit.UQC_Code,data.hb7_invoice_details[i].id);
                                }
                                this.ia = data.hb7_invoice_details.length;                              
                           

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

                                this.calculation();
                          }
  
                          edit_date()
                          {
                              this.date_edit = !this.date_edit;
                          }
                          edit_customer()
                          {  
                               this.cus_edit = !this.cus_edit;
                               this.get_customers_only();
                          }
  
  
                          pre_list()
                          {
                             
                            this.myModal_5.style.display = "block";  
                          }
                          close_modal_tran_list()
                          {
                            this.myModal_5.style.display = "none"; 
                          }
          
  
              _cus_selected(ev:any)
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

              customCallback(e:any)
              {
                alert('Incorrect selection')
              }

           
  
              update_customer()
              {
                this.api.change_customer_of_invoice(this.api.invoice_id,this.api.invo_head.cus_id,this.api.invo_head.type_ex)
                         .subscribe((jsonData) => { this.get_res_cc(jsonData)},(err) => console.error(err));         
              }
  
            
  
              choose_customer()
              {
               
                this._ec.nativeElement.value = null;
                this._ec.nativeElement.focus();
              }
                            close_modal_4()
                            {
                             // this.get_all_products()
                              this.myModal_4.style.display = "none";
                            }
  
                            update_close_modal()
                            {                        
                              
  
                               this.update_item_model = {invo_master_id : this.api.invo_head.idx,index:this.ka+1,
                                qty:this.pro_qty_model,rate:this.pro_p_model,value:this.pro_np_model,product_description:this.pro_description_model}
  
                               this.api.update_item_from_invoice_list(this.update_item_model)
                               .subscribe((jsonData) => { this.update_confirm(jsonData)
                                                   },(err) => console.error(err),);
  
  
                             
                            }
  
                            update_confirm(resp:any)
                            {
                              if(resp.success == true)
                              {
  
                              
                               this.api.Invoice_items_ary[this.ka].qty = this.pro_qty_model;
                               this.api.Invoice_items_ary[this.ka].rate = this.pro_p_model;
                               this.api.Invoice_items_ary[this.ka].value = this.pro_np_model; 
                               this.api.Invoice_items_ary[this.ka].product_description  = this.pro_description_model;
                            
                              this.myModal_3.style.display = "none";
                              this._en.nativeElement.value = null;
                              this._en.nativeElement.focus();
  
                             
                             this.change_in_payment();
                              }
                              else
                              {
                                alert('updation Failed try again or restart application');
                                this.myModal_3.style.display = "none";
                                this._en.nativeElement.value = null;
                                this._en.nativeElement.focus();
                              }
  
                            }
  
                            keyup_net_price_e()
                            {
                           
                            if(this.api.invo_head.type_ex == 'SEZ')
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
                           
                             if(this.api.invo_head.type_ex == 'SEZ')
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
                              
                            }
  
                            update_Invoice_taxed()
                            {
                               this.change_in_payment();
                               this.push_disabled_enter = 2; 
                               this.api.invo_head.status = 2;  
  
  
                         
                            
                             
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
  
  
                              this.Tax_info(this.api.Invoice_items_ary); 
                              this.invo_post_model = {
                                items : this.api.Invoice_items_ary,
                                head : this.api.invo_head,
                                cash_status : this.selectedStatus,
                              }
  
                              this.get_figure(this.api.invo_head.grand_amt);
                        
                              
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
                         
                         
                         this.api.figure_grand = p.msg;

                         
                       if(this.api.invo_head.type_ex == 'B2C')
                       {             
                         this.api.invo_head.type = 'B2C';                       
                       }
                         else
                       {                                                   
                           this.api.invo_head.type = 'B2B';
                       } 
  
                         this.api.update_invoice_taxed(this.invo_post_model.head)
                         .subscribe((jsonData) => { this.get_res(jsonData)
                                         },(err) => console.error(err),                                           
                                        );
  
                         }
                      
                            get_res(json:any)
                            {
                                
                                
       
                                if(json.success == true)
                                {     
                                  
                                  this.push_disabled_enter = 3;                                  
                                  
                               

                                  if(this.api.Company_dets.default_print_type == 9 && this.api.Company_dets.default_print_size == 'a4')
                                  {
                                    this.print = true;
  
                                  setTimeout(() => 
                                  {
                                  
                                    this.rs.navigate(['/home/new']);
                                    
                                  },
                                  4000);

                                  }

                                  else
                                  {

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
  
                            RemoveItem(item:any)
                            {
                            
                              
                                if(confirm("Are you sure to delete "+item.product_name+" from list")) 
                                {
                                   this.api.delete_item_from_invoice_list(item.idx,this.api.invo_head.idx,item.index_no)
                                  .subscribe((jsonData) => { this.delete_confirm(jsonData,item.index_no)
                                                      },(err) => console.error(err),);
                                }
                              }
  
                              delete_confirm(resp:any,index:number)
                              {
                                
                                 alert('item removed')
                           
                                 if(resp.success == true)
                                 {
                                  this.api.Invoice_items_ary.splice(index-1, 1);
                                  for(var i = index-1 ; i < this.ia-1 ; i ++)
                                  {
                                  
                                    this.api.Invoice_items_ary[i].index_no =  this.api.Invoice_items_ary[i].index_no - 1;
                                  }
                                  this.ia = this.ia - 1;
                                  this.calculation();
                                 }
                                 else
                                 {
                                  alert('error')
                                 }
                              
                              }
  
                              
                             
                            
                            
  
                            arrange_items()
                            {
  
                            }

                            edit_pre_reciepts(item:any)
                            {                            

                                  const dialogRef = this.dialog.open(Pre_reciept_edit_component, {
                                    width: '80%',
                                    data: { data: item }
                                  });
                                  dialogRef.afterClosed().subscribe(result => {
                                    //this.fetchData();
                                  });
                             

                            }
                            remove_pre_reciepts(item:any)
                            {
                              
                              if(confirm("Are you sure to delete " )) {                              
 
                                this.api.delete_a_reciept_from_invoice(item)
                                .subscribe((jsonData) => { this.j_s_nde(jsonData)
                                                    },(err:any) => console.error(err));
                                 
                                       

                              }
                            }
                            j_s_nde(res:any)
                            {
                              alert(res.msg);
                              
                              this.renew_view_reciept_table();
                            }
  
                            
                            editItem(item:any)
                            {
                             
                              this.ka = item.index_no-1;
                      
                              this.pro_name_model = this.api.Invoice_items_ary[this.ka].product_name
                              this.pro_description_model = this.api.Invoice_items_ary[this.ka].product_description
                              this.pro_qty_model = this.api.Invoice_items_ary[this.ka].qty
                              this.pro_p_model = this.api.Invoice_items_ary[this.ka].rate
                              this.pro_np_model = this.api.Invoice_items_ary[this.ka].value
                              this.pro_tax_model = this.api.Invoice_items_ary[this.ka].tax
                              this.pro_hsn_code_model = this.api.Invoice_items_ary[this.ka].hsn_code                  
                      
                              this.myModal_3.style.display = "block";   
                              
                              
                              this._eq_e.nativeElement.focus();    
                      
                            this.calculation();
  
                            }

                        
  
                            pushItem_down()
                            {
  
                              this.update_item_model = {master_id : this.api.invo_head.idx,index_no:this.ia+1,tax:this.pro_tax,
                                qty:this.pro_qty,rate:this.pro_rate,value:this.pro_np,product_id:this.pro_id,mrp:this.pro_mrp}                           
                                this.api.add_new_item_to_invoice(this.update_item_model)
                              .subscribe((jsonData) => { this.json_adds(jsonData)
                                                  },(err) => console.error(err));
  
  
  
                             
                             
                            }
  
                            json_adds(js:any)
                            {
                             
                              if(js.success == true)
                              {
                                this.stack_push(this.ia+1,this.pro_id,0,0,0,this.pro_qty,this.pro_rate,this.pro_mrp,this.pro_tax,
                                  this.pro_name,this.pro_np,null,this.pro_hsn,this.pro_unit,js.idx);
                          
                                this.ia = this.ia+1;   
                                this._en.nativeElement.value = null 
                                this._en.nativeElement.focus(); 
                                this.push_disabled = true;
                                this.change_in_payment();
                              }
                            }
  
  
                            stack_push(index_no:number,pro_id:number,batch_id:number,free_qty:number,
                              master_id:number,qty:number,rate:number,mrp:number,tax:number,pro_name:string,pro_np:number,pro_desc:any,hsn:string,unit:string,idx:number)
                            {
                              this.api.Invoice_items_ary.push({"index_no":index_no,"product_id":pro_id,"batch_id":batch_id,
                              "free_qty":free_qty,"master_id":master_id,
                              "qty":qty,"rate":rate,"mrp":mrp ,"tax":tax,"product_name":pro_name,
                              "unit":unit,"value":pro_np,"product_description":pro_desc,"hsn_code": hsn,"idx":idx})
                            }
                           
                            keyup_net_price()
                            {
                              if(this.api.invo_head.type_ex == 'SEZ')
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
                              if(this.api.invo_head.type_ex == 'SEZ')
                              {
                                this.pro_np = this.pro_rate;
                              }
                              else
                              {
                                this.pro_np = this.pro_rate + ((this.pro_rate * this.pro_tax)/100)
                                this.pro_np = Math.round(this.pro_np * 100) / 100
                              }
                            
                            }
  
                            keyup_tax()
                            {
  
                            }
  
                            move_to_payment()
                            {
                              this._en_b.nativeElement.focus();
                              this.change_in_payment();
                            }
  
  
                            change_item_name(i_c:any)
                            {         
                                let bi : any;                           
                                bi = this.arrayOfKeyValues.filter(xi=> xi.bar_code  === i_c);      
                                 
                                 if(bi.length == 1)
                                   { 
  
                                    this._eq.nativeElement.focus(); 
  
                                    this.check_for_duplication(bi[0].id)
  
                                    this.pro_id = bi[0].id;
                                    this.pro_hsn = bi[0].hsn_code;
                                    this.pro_name = bi[0].product_name
                                    this.pro_mrp = bi[0].mrp;
                                    this.pro_rate = bi[0].rate;
                                    this.pro_tax = bi[0].tax_rate;
                                    this.pro_unit = bi[0].hb7_unit.UQC_Code;  
                                    this.pro_qty = 1;               
                                 
                                    if(this.api.invo_head.type_ex != 'SEZ')
                                    {
                                        this.pro_np = bi[0].rate + ((bi[0].rate * bi[0].tax_rate)/100);
                                        this.pro_np =   Math.round(this.pro_np  * 100) / 100;
                                    }
                         
                                    else
                                    {
                                      
                                      this.pro_np =  bi[0].rate ;
                                      this.pro_tax = 0;
                                    }       
        
        
                             
                                    
                                  }
                                  else
                                  {
                                    alert('Duplicate or invalid barcodes..')
                                  }
                             
                                   this.push_disabled = false;
                                   
                          
                                }
  
                                check_for_duplication(id : number)
                                {
                                 
                                  const index = this.api.Invoice_items_ary.findIndex(xx=>xx.product_id == id)
                                  if(index != -1){
                                    this.myModal_3.style.display = "block";   
  
                                    this.ka = index;
         
                                    this.pro_name_model = this.api.Invoice_items_ary[this.ka].product_name
                                    this.pro_qty_model = this.api.Invoice_items_ary[this.ka].qty
                                    this.pro_p_model = this.api.Invoice_items_ary[this.ka].rate
                                    this.pro_np_model = this.api.Invoice_items_ary[this.ka].value
                                    this.pro_tax_model = this.api.Invoice_items_ary[this.ka].tax
                                    this.pro_description_model = this.api.Invoice_items_ary[this.ka].product_description;
                                    this.pro_hsn_code_model = this.api.Invoice_items_ary[this.ka].hsn_code;
                                   
                                    this._eq_e.nativeElement.focus(); 
                                   
                                  }
  
                                  else
                                  {
                                    console.log('not Found',index)
                                  }
                                  
                                  
                                  
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
                                  
                                 this.arrayOfKeyValues = json;
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
                                    this.pro_stock_qty = 0;
                                    
                                     this.pro_stock_qty = (data.op_bal + data.pur_tot + data.sales_ret_tot) - (data.purchase_ret_tot +  data.sales_tot)                           
                                  
                                     this.toastr.success('Qty On Stock  '+this.pro_stock_qty);

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
         
         this.api.frac =  this.api.invo_head.grand_amt -  this.api.floor;
         
     
         
  
         if(this.api.frac > .49)
         {
           this.api.frac = 1 - this.api.frac;
           this.api.floor = this.api.floor + 1;
  
         }
         this.api.frac =   Math.round(this.api.frac * 100) / 100;
    
      
         
  
       this.api.invo_head.grand_amt = this.api.floor;


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

   

        add_a_pays(item:any)
        {
         
          const dialogRef_reci = this.dialog.open(Pre_reciept_add_component, {
            width: '80%',
            data: { data: item }
          });
          dialogRef_reci.afterClosed().subscribe(result => {
            
            
            this.renew_view_reciept_table();

          });
      
        }

        renew_view_reciept_table()
        {
          while (this.api.Trans_dets.length > 0) 
          {
            this.api.Trans_dets.pop();                                               
          }


          this.api.get_all_trans_detail_of_a_invoice(this.api.invoice_id) 
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

        print_reciepts(item:any)
        {

          

          this.api.cdmodels.serial_no = item.serial_no;
          this.api.cdmodels.amount = item.amount;
          this.api.cdmodels.date = item.date;
          this.api.cdmodels.pay_mode = item.mode;
          this.api.cdmodels.ref_no = item.ref_no;
          

         this.myModal_5.style.display = "none"; 

         this.print_cash_reciept_flag = 1;

        
         
          setTimeout(() => 
          {
          
            window.print();
            
          },
          800);  
          }


        
         
        

       

    
  }
  
 



  @Component({
    selector: 'app-pre-reciept-editor',
    templateUrl: './pre-reciept-editor.html',
    styleUrls: ['./main.scss']
  })
  export class Pre_reciept_edit_component implements OnInit {
    constructor(private router: Router, private apiService: ApiService, 
      public dialogRef_pew: MatDialogRef<Pre_reciept_edit_component>, @Inject(MAT_DIALOG_DATA) public data_x: any, public dialog: MatDialog) {
        
          }

    ngOnInit(): void {
   
     
                     }
    closeFunction()
    {
       this.dialogRef_pew.close();
    }
  }
  

@Component({
  selector: 'app-pre-reciept-adder',
  templateUrl: './pre-reciept-adder.html',
  styleUrls: ['./main.scss']
})

export class Pre_reciept_add_component implements OnInit {
  push_disabled_enter  : number = 1;
  add_amt : number;
  add_pay_model : any;
  mode : string = 'CASH';
  ref_no : string;
  date : Date = new Date();
  constructor(private router: Router, private api: ApiService, 
    public dialogRef_reciept: MatDialogRef<Pre_reciept_add_component>, @Inject(MAT_DIALOG_DATA) public data_x: any, public dialog: MatDialog) {
      
        }

  ngOnInit(): void {
    
    
                    }
  add_new_single_receipt()
  {
     
    this.add_pay_model = {master_id : this.data_x.data.master_id , cast : this.data_x.data.cast , is_bulk_pay: this.data_x.data.is_bulk_pay ,date:this.date,
       status: 1, amt : this.add_amt, mode : this.mode , type : 'CREDIT' , ref_no : this.ref_no}  


    if(confirm("Are you sure to add a payment " )) {

      this.push_disabled_enter = 2;   

      this.api.add_new_single_reciept(this.add_pay_model)
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
     this.dialogRef_reciept.close();
  }
}
  