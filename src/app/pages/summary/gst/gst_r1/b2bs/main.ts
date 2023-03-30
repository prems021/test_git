


import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../../services/api.service';
import { process_list } from '../model';
import { TableUtil } from '../../../table_utl';

@Component({
  selector: 'app-summary-gst-r1-b2b-coloum',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Summary_b2bs_colum implements OnInit {


  submitted = false;
  sdate : any;
  edate : any;
  Process_list :  process_list[] = [];

  run_i : number = 0;
  hold_i : number = 0;
  hold_i_tax : number = 0;
  hold_i_rate : number = 0;
  hold_i_tax_value : number = 0;
  hold_i_qty : number = 0; 
  hold_i_taxable_value: number =0;
  hold_i_invoice_number : string ;
  hold_i_id : number = 0;
  public post_mo : any = {sdate :"",edate:"",com_id:null}
  Onload: number = 0;
  Invoice_Type: string;
  igst_amt: number = 0;
  tax_amt: number = 0;
  sgst_amt: number;
  tomorrow = new Date();
  constructor(public api : ApiService) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    }

  ngOnInit(): void {

 

  }

  generate()
  {
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
        this.api.summary_gst_b2bs(this.post_mo).subscribe((data:any) => {
          this.get_res_(data);
        });
    }
  }

  export()
  {
    TableUtil.exportToExcel("e_gst_4");
  }
  get_res_(data:any)
  {
    this.Onload = 2;

    console.log('...data',data)
     for(var i = 0;i<data.length;i++)
        {

          let result = data[i].hb7_customer.gst_in.slice(0, 2); 
                  const msd =  this.api.state_list.filter(xy=>xy.state_code == result);                  
                  if(msd.length <= 0)
                  {
                    alert('Invalid Gst code found....');
                    this.Invoice_Type = 'Regular';
                  }
                  else
                  {
                    this.api.state_code = msd[0].state_code;
                    this.api.state_name = msd[0].state_name;
                    if(data[i].hb7_customer.cast == 1 || data[i].hb7_customer.cast == 2)
                    { 
                    if(this.api.Company_dets.company_gstin.slice(0, 2) == this.api.state_code)
                    {
                      this.Invoice_Type = 'Regular';
                    }
                    else
                    {
                      this.Invoice_Type = 'Intra-State supplies attracting IGST';
                    }
                   }
                   else{
                    if(data[i].hb7_customer.cast == 3)
                      {
                        this.Invoice_Type = 'SEZ supplies without payment';
                      }

                      if(data[i].hb7_customer.cast == 5)
                      {
                        this.Invoice_Type = 'Deemed Exp';
                      }                    
                  }
                }


               

         
                 for(var j = 0; j<data[i].hb7_invoice_details.length;j++)
            {

             

              this.tax_amt =  data[i].hb7_invoice_details[j].rate * data[i].hb7_invoice_details[j].qty *  data[i].hb7_invoice_details[j].tax / 100;

              if(this.Invoice_Type == 'Intra-State supplies attracting IGST')
              {
                     this.igst_amt = this.tax_amt;
                     this.sgst_amt = 0;
              }
              if(this.Invoice_Type == 'Regular')
              {
               this.sgst_amt = this.tax_amt/2;               
               this.igst_amt = 0;
              }
              if(this.Invoice_Type == 'SEZ supplies without payment')
              {
               this.tax_amt = 0;
               this.sgst_amt = 0;
               this.igst_amt = 0;
              }


            

              const index = this.Process_list.findIndex(item => item.Rate == data[i].hb7_invoice_details[j].tax && item.id ==  data[i].hb7_invoice_details[j].master_id)
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
       this.Onload = 3;

      }
    }
             
           
                        


  


