import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';

import { DataService } from '../../../../services/data.service';
import { ApiService } from '../../../../services/api.service';
import { B2B_items , B2c_items , Items_hsn } from '../model';
import { TableUtil } from '../../tableUtil';

@Component({
  selector: 'app-gst-main',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Gst_report_main_Component implements OnInit {
  
  myOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
  }

  myForm : FormGroup;
  submitted = false;
  returnUrl: string;
  Onload : number = 1;
  i : number = 0;
  j : number = 0;
  k: number = 0 ;
  igst : number = 0;
  tax_info : B2B_items [] = [];
  tax_info_b2c : B2c_items [] = [];
  items_hsn : Items_hsn [] = []
  options = ['B2B','B2C','HSN']
  constructor(
    private fb: FormBuilder,
    public ds: DataService,
    public api : ApiService,
    private router: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService
  ) {}

  ngOnInit(): void {

    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};
    this.myForm = this.fb.group({
      myDate_from: [model, Validators.required],
      myDate_to: [model, Validators.required],
      com_id : 0,
      sel_opt : ['B2B'],
      
    });
  }
  setDate(): void {
    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};
    this.myForm.patchValue({myDate_from: model});
  }

  setDate_to(): void {
    let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};
    this.myForm.patchValue({myDate_from: model});
  }

  clearDate(): void {   
    this.myForm.patchValue({myDate_from: null});
  }
  clearDate_t(): void {
    this.myForm.patchValue({myDate_to: null});
  }

  onSubmit()
  {
    // this.myForm.patchValue({"com_id":this.api.user.hb7_company_detail.id})
    // console.log(this.myForm.value);
    // this.Onload = 2;
    // this.api.gst_report_common(this.myForm.value).subscribe((data) => {
    //   if(this.myForm.controls.sel_opt.value == 'B2B')
    //   {       
    //     console.log('data 1..B2b process',data)
    //     while (this.tax_info.length > 0) 
    //     {
    //       this.tax_info.pop();                                                                      
    //     }
    //     this.get_res_gst_in(data);
    //   }
    //   if(this.myForm.controls.sel_opt.value == 'B2C')
    //   {
    //     console.log('data 2..B2b process',data)

    //     while (this.tax_info_b2c.length > 0) 
    //     {
    //       this.tax_info_b2c.pop();                                                                      
    //     }

    //     this.get_res_gst_in_b2c(data);
    //   }
    //   if(this.myForm.controls.sel_opt.value == 'HSN')
    //   {
    //     console.log('data 3..B2b process',data)

    //     this.api.gst_report_hsn_(this.myForm.value).subscribe((data:any) => {

    //       console.log('daa hsn',data)

    //       while (this.items_hsn.length > 0) 
    //       {
    //         this.items_hsn.pop();                                                                      
    //       }



    //       this.make_hsn_table(data.data)
    //     })



    //   }
      
    // });
  }
  make_hsn_table(data:any)
  {
    for(this.i=0;this.i<data.length;this.i++)
       { 

        console.log('inside i',this.i,this.j)

        for(this.j = 0; this.j<data[this.i].hb7_invoice_details.length;this.j++)
              {
                this.igst = (( data[this.i].hb7_invoice_details[this.j].qty * data[this.i].hb7_invoice_details[this.j].rate ) * data[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate)/100
 
                if(this.j == 0 && this.i == 0)
                        {
                          this.push_item_hsn_in(data[this.i].hb7_invoice_details[this.j].Hb7_product.hsn_code,
                            data[this.i].hb7_invoice_details[this.j].Hb7_product.product_name,null,data[this.i].hb7_invoice_details[this.j].qty,
                            data[this.i].hb7_invoice_details[this.j].mrp *  data[this.i].hb7_invoice_details[this.j].qty,
                            data[this.i].hb7_invoice_details[this.j].rate * data[this.i].hb7_invoice_details[this.j].qty,
                            this.igst   ,    this.igst/2 ,  this.igst/2 , 
                            0, data[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate)
                        }
                  else
                  {
                    const in_tax = this.items_hsn.findIndex(xyu => xyu.HSN == data[this.i].hb7_invoice_details[this.j].Hb7_product.hsn_code)
                                if(in_tax < 0)
                                   { 
                                    
                                    this.push_item_hsn_in(data[this.i].hb7_invoice_details[this.j].Hb7_product.hsn_code,
                                      data[this.i].hb7_invoice_details[this.j].Hb7_product.product_name,null,data[this.i].hb7_invoice_details[this.j].qty,
                                      data[this.i].hb7_invoice_details[this.j].mrp *  data[this.i].hb7_invoice_details[this.j].qty,
                                      data[this.i].hb7_invoice_details[this.j].rate * data[this.i].hb7_invoice_details[this.j].qty,
                                      this.igst   ,    this.igst/2 ,  this.igst/2 , 
                                      0, data[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate)


                                   }
                                   else
                                   {
                                    this.items_hsn[in_tax].Total_Quantity  =  this.items_hsn[in_tax].Total_Quantity + data[this.i].hb7_invoice_details[this.j].qty;
                                    this.items_hsn[in_tax].Total_value  =  this.items_hsn[in_tax].Total_value + data[this.i].hb7_invoice_details[this.j].mrp *  data[this.i].hb7_invoice_details[this.j].qty;
                                    this.items_hsn[in_tax].Taxable_value  =  this.items_hsn[in_tax].Taxable_value + data[this.i].hb7_invoice_details[this.j].rate *  data[this.i].hb7_invoice_details[this.j].qty;


                                    
                                    this.items_hsn[in_tax].Integrated_Tax_Amount =   this.items_hsn[in_tax].Integrated_Tax_Amount + this.igst ;
                                    this.items_hsn[in_tax].Central_Tax_Amount =   this.items_hsn[in_tax].Central_Tax_Amount + this.igst/2 ;
                                    this.items_hsn[in_tax].State_UT_Tax_Amount =   this.items_hsn[in_tax].State_UT_Tax_Amount + this.igst/2 ;
                                   }
                  }      

               this.Onload = 6;

              }
        }      

  }







  push_item_hsn_in(hsn : string,descript: string,UQC:string,t_qty:number,total_value:number,taxable_value:number, igst:number, cgst : number,sgst : number , cess: number , tax_rate : number)
  {
    this.items_hsn.push({ HSN : hsn, Description : descript, UQC : null, Total_Quantity : t_qty,
       Integrated_Tax_Amount : igst ,  Central_Tax_Amount : cgst,Taxable_value:taxable_value,Total_value:total_value,
      State_UT_Tax_Amount : sgst , Cess_Amount : cess ,  Rate : tax_rate   })
  }

  get_res_gst_in_b2c(data:any)
  {
    console.log('data.',data)
    for(this.i=0;this.i<data.b2c.length;this.i++)
    { 
 
     console.log('i.....',this.i)
 
       for(this.j = 0; this.j<data.b2c[this.i].hb7_invoice_details.length;this.j++)
       {
  
          if(this.j == 0 && this.i == 0)
          {
            this.push_item_b2c('OE','pos',null,data.b2c[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate,
            data.b2c[this.i].hb7_invoice_details[this.j].qty * data.b2c[this.i].hb7_invoice_details[this.j].rate,null,null)
          }
          else
          {
 
           const in_tax = this.tax_info_b2c.findIndex(xyu => xyu.Rate == data.b2c[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate)
              if(in_tax < 0)
                 {
 
                  this.push_item_b2c('OE','pos',null,data.b2c[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate,
                  data.b2c[this.i].hb7_invoice_details[this.j].qty * data.b2c[this.i].hb7_invoice_details[this.j].rate,null,null)
 
                 }
                 else
                 {
  
                   this.tax_info_b2c[in_tax].Taxable_Value = this.tax_info_b2c[in_tax].Taxable_Value + data.b2c[this.i].hb7_invoice_details[this.j].qty * data.b2c[this.i].hb7_invoice_details[this.j].rate
                   
                 }
               }

        }
    }

    this.Onload = 5;

  }

  push_item_b2c(type:any,pos:any,apot:any,rate:number,Taxable_Value:number,cess:number,E_gstin:any)
{
  this.tax_info_b2c.push({"Type":"OE","Place_Of_Supply":"","Applicable_percentage_of_Tax_Rate":0,"Rate":rate,
  "Taxable_Value":Taxable_Value,"Cess_Amount":0,"E_Commerce_GSTIN":null})
}



  get_res_gst_in(data:any)
  {
   console.log('data..B2b process',data)

   for(this.i=0;this.i<data.b2b.length;this.i++)
   { 

    console.log('i.....',this.i)

      for(this.j = 0; this.j<data.b2b[this.i].hb7_invoice_details.length;this.j++)
      {
 
         if(this.j == 0)
         {
          this.Push_item(data.b2b[this.i].hb7_customer.gst_in,data.b2b[this.i].hb7_customer.name,data.b2b[this.i].invoice_no,
            data.b2b[this.i].invoice_date, data.b2b[this.i].grand_amt,'pos','N',null,'Regular',null,data.b2b[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate,
            data.b2b[this.i].hb7_invoice_details[this.j].qty * data.b2b[this.i].hb7_invoice_details[this.j].rate,0)
         }

         else
         {

          const in_tax = this.tax_info.findIndex(xyu => xyu.Invoice_Number == data.b2b[this.i].invoice_no && xyu.Rate == data.b2b[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate)
             if(in_tax < 0)
                {

                  this.Push_item(data.b2b[this.i].hb7_customer.gst_in,data.b2b[this.i].hb7_customer.name,data.b2b[this.i].invoice_no,
                    data.b2b[this.i].invoice_date, data.b2b[this.i].grand_amt,'pos','N',null,'Regular',null,data.b2b[this.i].hb7_invoice_details[this.j].Hb7_product.tax_rate,
                    data.b2b[this.i].hb7_invoice_details[this.j].qty * data.b2b[this.i].hb7_invoice_details[this.j].rate,0)

                }
                else
                {
 
                  this.tax_info[in_tax].Taxable_Value = this.tax_info[in_tax].Taxable_Value + data.b2b[this.i].hb7_invoice_details[this.j].qty * data.b2b[this.i].hb7_invoice_details[this.j].rate
                  
                }
              }
      


        console.log('j....',this.j)
      }
  

   }

   this.Onload = 3;


  }

Push_item(gst_of_reci:string,reciver_name : string,invo_number:number,invo_date:string,invoice_value:number,pos:string,
  rev_n:string,apl_tax_rate:number,invo_type:string,ecom_gst_in:string,rate:number,taxable_value:number,cess_amt:number)
{
  this.tax_info.push({"GSTIN_UIN_of_Recipient":gst_of_reci,"Receiver_Name":reciver_name,"Invoice_Number":invo_number,
 "Invoice_date":invo_date,"Invoice_Value":invoice_value,Place_Of_Supply:pos,"Reverse_Charge":rev_n,
"Applicable_percentage_of_Tax_Rate":apl_tax_rate,"Invoice_Type":invo_type,"E_Commerce_GSTIN":ecom_gst_in,"Rate":rate,
"Taxable_Value":taxable_value,"Cess_Amount":cess_amt })
}





exportTable(){
  TableUtil.exportToExcel("ExampleTable_");
}

exportTable_b2c(){
  TableUtil.exportToExcel("ExampleTable_b2c");
}

exportTable_hsn(){
  TableUtil.exportToExcel("ExampleTable_hsn");
}



   
}
