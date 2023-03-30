import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import {AngularMyDatePickerDirective, DefaultView, IAngularMyDpOptions,IMyInputFieldChanged, 
  IMyDateModel, IMyMarkedDate, CalAnimation} from  'angular-mydatepicker';
  import { ShortcutInput, ShortcutEventOutput,KeyboardShortcutsComponent  } from "ng-keyboard-shortcuts";
import { DatePipe } from '@angular/common';
  

@Component({
  selector: 'app-new-purchase-return',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Purchase_Return_Component implements OnInit {


  color : string ;
  Recieved_amt : number = 0;
  ia : number = 0;
  ka : number = 0;
  items : any [] = [];
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
  public invoice_date_ref : Date = new Date();
  
  selectedStatus :  number = 1;
  is_date_changed :  boolean = false;
  panelOpenState = false;
  CUS_MODEL : any = 'Cash';
  invo_type : number = 1;
  arrayOfCusValues : any [] = [];
  myModal_4 : any; 
  myModal_3 : any;
  
  // _80_print : boolean = false;
  // a5_print : boolean = false;
  // a4_print : boolean = true;
 

  push_disabled_enter : number = 1;
  push_disabled : boolean = false;

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

  @ViewChild("autos") _en: ElementRef;
  @ViewChild("customers") _ec: ElementRef;
  @ViewChild("item_qty_model") _eq: ElementRef; 
  @ViewChild("item_qty_model_e") _eq_e: ElementRef; 
  @ViewChild("bill_pay") _en_b: ElementRef;
  @ViewChild("item_eq_mobile") _eq_mobile: ElementRef; 
 
  @ViewChild("box_rate_mobile") _box_rate_mobile: ElementRef;
  @ViewChild("autos_22") _en_mobile: ElementRef;
  

  constructor(   
    private rs: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService,
    public api : ApiService,
    public ds : DataService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {


    this.api.invo_head.ref_invoice_number = null; 
    this.api.invo_head.ref_invoice_date = null; 

    this.mobile_view = false; 
    this.api.invo_head.invoice_date = this.invoice_date.toISOString(); 
    this.api.invo_head.ref_invoice_date = this.invoice_date_ref.toISOString(); 
     

    this.api.invo_head.cus_id =1;
    this.api.invo_head.customer_Name = 'Cash';

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
                            
                                            console.log('onDateChanged(): ', event);  
                                            this.api.invo_head.invoice_date = this.datepipe.transform(event.singleDate.jsDate,'yyyy-MM-dd'); 
                                            console.log('dseee', this.api.invo_head.invoice_date )
                                            this.is_date_changed = !this.is_date_changed; 


                        

                                        }

                       onDateChanged_ref(event: IMyDateModel): void {


                        console.log('onDateChanged(): ', event);  
                        this.api.invo_head.ref_invoice_date = this.datepipe.transform(event.singleDate.jsDate,'yyyy-MM-dd'); 
                        console.log('dseee', this.api.invo_head.ref_invoice_date )
                     

                       }



                       onInputFieldChanged(event: IMyInputFieldChanged): void {
                        //  console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
                          this.validDate = event.valid;
                          this.inputText = event.value;
                        }
   change_type()
            {
              this.invo_type ++ ;

               if(this.invo_type == 5)
               {
                this.invo_type = 1
                this.api.invo_head.type = 'B2C'
               }
               else
               {
                               

                switch (this.invo_type) {
                  
                  case 2:
                    this.api.invo_head.type = 'B2B'
                      break;
                  case 3:
                    this.api.invo_head.type = 'SEZ'
                      break;
                  case 4:
                    this.api.invo_head.type = 'IGST'
                    break;

                    default:
                      console.log("No such day exists!");
                      break;                    
               }

              }
               
            }

           

            _cus_selected(ev:any)
            {
              console.log('ev',ev)
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
                this.api.invo_head.type = 'B2C'
              }

              else
              {
                this.toogle_head_det = true;
                console.log('evs', this.api.invo_head.cus_id)
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
                        this.api.invo_head.type = 'SEZ'
                      }
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
                            // this.check_dues();
                          }

                          keyup_net_price_e()
                          {
                         
                          if(this.api.invo_head.type == 'SEZ')
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
                         
                           if(this.api.invo_head.type == 'SEZ')
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

                       this.api.post_debit_note_taxed(this.invo_post_model)
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

                                this.api.invo_head.invoice_no_genrated  = json.mas_id;

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
           
        // var x = this.pdt_tax_list.indexOf(data.items[liss].TAX,0)
        // console.log('id',x)
        // if(x < 0)
        
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

                          RemoveItem(index:number)
                          {
                            
                            this.api.Invoice_items_ary.splice(index, 1);
                            for(var i = index ; i < this.ia-1 ; i ++)
                            {
                              this.api.Invoice_items_ary[i].index_no =  this.api.Invoice_items_ary[i].index_no - 1;
                            }
                            this.ia = this.ia - 1;
                            this.calculation();
                           // this.check_dues();
                          }

                          arrange_items()
                          {

                          }

                          
                          editItem(index:number)
                          {
                           // this.on_edit = true;
                            this.ka = index;
                    
                            this.pro_name_model = this.api.Invoice_items_ary[index].product_name
                            this.pro_description_model = this.api.Invoice_items_ary[index].product_description
                            this.pro_qty_model = this.api.Invoice_items_ary[index].qty
                            this.pro_p_model = this.api.Invoice_items_ary[index].rate
                            this.pro_np_model = this.api.Invoice_items_ary[index].value
                            this.pro_tax_model = this.api.Invoice_items_ary[index].tax
                            this.pro_hsn_code_model = this.api.Invoice_items_ary[index].hsn_code
                        
                    
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
                           // this.check_dues();
                          }


                          pushItem_down()
                          {
                            this.stack_push(this.ia+1,this.pro_id,0,0,0,this.pro_qty,this.pro_rate,this.pro_mrp,this.pro_tax,
                              this.pro_name,this.pro_np,null,this.pro_hsn);
                      
                            this.ia = this.ia+1;   
                            this._en.nativeElement.value = null 
                            this._en.nativeElement.focus(); 
                            this.push_disabled = true;
                            this.calculation();
                           // this.check_dues();
                          }
                          stack_push(si_no:number,pro_id:number,batch_id:number,free_qty:number,
                            master_id:number,qty:number,rate:number,mrp:number,tax:number,pro_name:string,pro_np:number,pro_desc:any,hsn:string)
                          {
                            this.api.Invoice_items_ary.push({"index_no":si_no,"product_id":pro_id,"batch_id":batch_id,
                            "free_qty":free_qty,"master_id":master_id,
                            "qty":qty,"rate":rate,"mrp":mrp ,"tax":tax,"product_name":pro_name,
                            "unit":this.pro_unit,"value":pro_np,"product_description":null,"hsn_code": hsn,"idx":0})
                          }
                         
                          keyup_net_price()
                          {
                            if(this.api.invo_head.type == 'SEZ')
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
                            if(this.api.invo_head.type == 'SEZ')
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
                                this.pro_unit = event.hb7_unit.unit;  
                                this.pro_qty = 1;  
                                
                                
                                

                                    if(this.api.invo_head.type != 'SEZ')
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

                          change_item_name(i_c:any)
                          {         
                              let bi : any;                           
                              bi = this.arrayOfKeyValues.filter(xi=> xi.bar_code  === i_c);      
                              console.log('bi',bi)    
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
                                  this.pro_unit = bi[0].hb7_unit.unit;  
                                  this.pro_qty = 1;               
                               
                                  if(this.api.invo_head.type != 'SEZ')
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
                                  console.log('Found',index)
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
                                  console.log('not Found',index);
                                  this.push_disabled_mobile = false;
                                }
                                
                                
                                
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


                              init_api_values()
                              {

                                while (this.api.Invoice_items_ary.length > 0) 
                                {
                                  this.api.Invoice_items_ary.pop();
                                                                      
                                }
                              
                                this.api.invo_head.mode = 'PUR_RET' ;
                                this.api.invo_head.type = 'B2C' ;
                                this.api.invo_head.cast = 1 ;
                                this.api.invo_head.mode_of_pay = 1;
                                this.api.invo_head.recieved_amt = 0;
                                this.api.invo_head.due_amt = 0;
                                this.api.invo_head.balance_amt = 0; 
                                this.api.invo_head.grand_amt = 0; 
                                this.get_vendors();
                                this.get_products();
                              }

                              // get_customers_only()
                              // {
                              //    this.api.cus_vendor_list_filter_cus_only()
                              //   .subscribe((jsonData) => { this.json_customers(jsonData)
                              //                       },(err) => console.error(err),);
                              // }
                              
                              // json_customers(json :any)
                              //   {    
                              //   this.arrayOfCusValues = json;    
                              //   } 

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
                                  this.arrayOfCusValues  = json;
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
