


import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../../services/api.service';
import { process_list, b2cs_summary_list } from '../model';
import { TableUtil } from '../../../table_utl';

@Component({
  selector: 'app-summary-gst-r1-b2c-small',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Summary_b2c_small implements OnInit {


  submitted = false;
  sdate : any;
  edate : any;
  Process_list :  process_list[] = [];
  summary_list : b2cs_summary_list[] = [];
  tomorrow = new Date();
  run_i : number = 0;
  hold_i : number = 0
  hold_i_tax : number = 0;
  hold_i_rate : number = 0;
  hold_i_tax_value : number = 0;
  hold_i_qty : number = 0; 
  hold_i_taxable_value: number =0;
  hold_i_invoice_number : string ;
  hold_i_id : number = 0;
  public post_mo : any = {sdate :"",edate:"",com_id:null}
  Onload: number = 1;
  Invoice_Type: string;
  igst_amt: number = 0;
  tax_amt: number = 0;
  sgst_amt: number;
  
  constructor(public api : ApiService) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    }

  ngOnInit(): void {

    this.Process_list = [];
    this.summary_list = [];
 

  }

  generate()
  {
    this.Onload = 2;
    console.log('s',this.sdate);
    console.log('e',this.edate);
    if(this.sdate == null || this.edate == null)
    {
      alert('select date range properly')
    }
    else{
        this.post_mo.sdate = this.sdate;
        this.post_mo.sdate.setDate( this.post_mo.sdate.getDate() + 1);
        this.post_mo.edate = this.edate;
        this.post_mo.edate.setDate( this.post_mo.edate.getDate() + 1);
        this.post_mo.com_id = this.api.invo_head.com_id ;
        this.api.summary_gst_b2c_small(this.post_mo).subscribe((data:any) => {
          this.get_res_(data);
        });
    }
  }

  export()
  {
    TableUtil.exportToExcel("e_gst_7");
  }

  export_summary()
  {
    TableUtil.exportToExcel("e_gst_7_s");
  }
  get_res_(data:any)
  {
   

    console.log('...data',data)
     for(var i = 0;i<data.length;i++)
        {

          
                                 
                  if(data[i].hb7_customer.gst_in != null )
                  {
                    if(data[i].hb7_customer.gst_in.length > 10)
                    {
                    alert('Invalid Gst code found....'+data[i].id);
                    
                    }
                
                  }
               

         
                 for(var j = 0; j<data[i].hb7_invoice_details.length;j++)
            {

             

              this.tax_amt =  data[i].hb7_invoice_details[j].rate * data[i].hb7_invoice_details[j].qty *  data[i].hb7_invoice_details[j].tax / 100;

          
            
               this.sgst_amt = this.tax_amt/2;               
               this.igst_amt = 0;
              
           


            

              const index = this.Process_list.findIndex(item => item.Rate == data[i].hb7_invoice_details[j].tax && item.Invoice_Number ==  data[i].invoice_no)
              if(index == -1)
              {

                

                this.Process_list.push({"Applicable_percent_of_Tax_Rate":null,"Cess_Amount":null,"Cgst_amt":this.sgst_amt,"E_Commerce_GSTIN":null,
                "GSTIN_of_Recipient":data[i].hb7_customer.gst_in,
                "Name_of_Recipient":data[i].hb7_customer.name,"Igst_amt":this.igst_amt,"Invoice_Number":data[i].invoice_no,
                "Invoice_Type":this.Invoice_Type,"Invoice_Value":data[i].grand_amt,
                "Invoice_date":data[i].invoice_date,
                "Place_Of_Supply":this.api.state_code+'-'+this.api.state_name,"Rate":data[i].hb7_invoice_details[j].tax,
                "Receiver_Name":null,"Reverse_Charge":null,"Sgst_amt":this.sgst_amt,
                "Taxable_Value": data[i].hb7_invoice_details[j].rate * data[i].hb7_invoice_details[j].qty,"id":data[i].hb7_invoice_details[j].master_id})
              }
              else
              {

                this.Process_list[index].Taxable_Value = this.Process_list[index].Taxable_Value + data[i].hb7_invoice_details[j].rate * data[i].hb7_invoice_details[j].qty;
                this.Process_list[index].Igst_amt =    this.Process_list[index].Igst_amt + this.igst_amt;
                this.Process_list[index].Sgst_amt =    this.Process_list[index].Sgst_amt + this.sgst_amt;
                this.Process_list[index].Cgst_amt =    this.Process_list[index].Cgst_amt + this.sgst_amt;
              }



                               
            }


       } 
       
       console.log('data',this.Process_list)
      



          
       for(var k = 0; k<this.Process_list.length;k++)
       {
       

 
        const indey = this.summary_list.findIndex(item => item.Rate == this.Process_list[k].Rate)
        if(indey == -1)
        {
         
          this.summary_list.push({"Applicable_percent_of_Tax_Rate":null,"Cess_Amount":null,"Cgst_amt":this.Process_list[k].Sgst_amt,
          "gst_amt":this.Process_list[k].Sgst_amt*2,"Invoice_Type":"Regular","Place_Of_Supply":null,"Rate":this.Process_list[k].Rate,
          "Taxable_Value":this.Process_list[k].Taxable_Value,"id":0,"mode":null,"Sgst_amt":this.Process_list[k].Sgst_amt
        })
         }
        else
        {
          this.summary_list[indey].Taxable_Value =  this.summary_list[indey].Taxable_Value + this.Process_list[k].Taxable_Value;
          this.summary_list[indey].Cgst_amt =  this.summary_list[indey].Cgst_amt + this.Process_list[k].Sgst_amt;
          this.summary_list[indey].Sgst_amt =  this.summary_list[indey].Sgst_amt + this.Process_list[k].Sgst_amt;
          this.summary_list[indey].gst_amt =  this.summary_list[indey].gst_amt + (this.Process_list[k].Sgst_amt*2);
        }
          


       }




       this.Onload = 3;




      }
    }
             
           
                        


  


