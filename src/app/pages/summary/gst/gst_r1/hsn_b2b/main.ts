


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { hsn_list } from '../model';
//import { TableUtil } from '../../../table_utl';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-summary-sales-hsn-wise-b2b',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Summary_gst_hsn_wise_sales_b2b implements OnInit {


  submitted = false;
  sdate : any;
  edate : any;
  public post_mo : any = {sdate :"",edate:"",com_id:null}
  Onload : number = 1;
  Process_list :  hsn_list[] = [];
  index_si : number = 0;


  taxable_value : number = 0;
  tax_value : number = 0;


  //summary_list : b2cs_summary_list[] = [];

  public columns: Columns[] = [
    { key: 'si_no', title: 'si.No' },
    { key: 'hsn_code', title: 'HSN' },
    { key: 'product_name', title: 'Product Name' },
    { key: 'unit_code', title: 'UQC' },
    { key: 'total_Qty', title: 'Total Quantity' },
    { key: 'total_Value', title: 'Total Value' },
    { key: 'total_taxable_Value', title: 'Total Taxable Value' },
    { key: 'rate', title: 'Tax Rate' },
    { key: 'Igst', title: 'Integrated Tax' },
    { key: 'Sgst', title: 'Central Tax' },
    { key: 'Cgst', title: 'State Tax' },
    { key: 'Cess', title: 'CESS' },
  ];
 
  configuration: Config;
    sgst: number;
    cgst: number;
    igst: number;
    total_Value: number;

  constructor(public api : ApiService) {
   
    }

  ngOnInit(): void {

   this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.paginationEnabled = false;
    this.configuration.rows = 50;
    this.configuration.infiniteScroll = true;
  }

  setDate(ev:any)
  {
      console.log('e',ev)
  }

  generate()
  {

    this.Onload  = 2;
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
        this.api.summary_sales_hsn_wise_stock_b2b(this.post_mo).subscribe((data:any) => {
          this.get_res_(data);
        });
    }    
  
  }

  export()
  {
    //TableUtil.exportToExcel("e_gst_7");
  }
  exportToCSV(): void {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.Process_list);
  }
 
  get_res_(data:any)
  {
    this.index_si = 0;

    console.log('...data',data)
     for(var i = 0;i<data.length;i++)
        {
            this.taxable_value = 0;
            this.tax_value = 0;
            this.total_Value = 0;
            this.sgst = 0;
             this.cgst = 0;
             this.igst = 0;

            for(var j = 0;j<data[i].hb7_invoice_details.length;j++)  
             {

               this.taxable_value =   data[i].hb7_invoice_details[j].rate *  data[i].hb7_invoice_details[j].qty ;
               this.taxable_value =  Math.round(this.taxable_value * 100) / 100;

               this.tax_value = this.taxable_value * data[i].hb7_invoice_details[j].tax / 100;
               this.tax_value =  Math.round(this.tax_value * 100) / 100;

               this.total_Value = this.taxable_value  + this.tax_value;
               this.total_Value =  Math.round(this.total_Value * 100) / 100;  

               switch (data[i].hb7_customer.cast) {
                 case 1:
                    this.sgst = this.tax_value/2;
                    this.sgst =  Math.round(this.sgst * 100) / 100;
                    this.cgst = this.tax_value/2;
                    this.cgst =  Math.round(this.cgst * 100) / 100;
                    this.igst = 0;
                    break;
                case 2:
                    this.sgst = 0;
                    this.cgst = 0;
                    this.igst = this.tax_value;
                    break;
                case 3:
                    this.sgst = 0;
                    this.cgst = 0;
                    this.igst = 0;
                    this.tax_value = 0;
                    break;
                 case 5:
                    console.log("It is a Export.");
                     break;               
                default:
                    console.log("No such opts exists!");
                    break;
            }

               

               const index = this.Process_list.findIndex(item => item.hsn_code == data[i].hb7_invoice_details[j].Hb7_product.hsn_code && item.unit_code == data[i].hb7_invoice_details[j].Hb7_product.hb7_unit.UQC_Code)
             if(index == -1)
              {             
                this.index_si = this.index_si + 1;
                this.Process_list.push({"si_no": this.index_si,"Cess":null,"rate":data[i].hb7_invoice_details[j].tax,
                "Cgst":this.sgst,"Igst":this.igst,"Sgst":this.sgst,"hsn_code":data[i].hb7_invoice_details[j].Hb7_product.hsn_code,"id":null,"product_name":data[i].hb7_invoice_details[j].Hb7_product.product_name,
                "total_Qty":data[i].hb7_invoice_details[j].qty,"total_Value":this.total_Value,"total_taxable_Value":this.taxable_value,"unit_code":data[i].hb7_invoice_details[j].Hb7_product.hb7_unit.UQC_Code})
                
              }
              else
              {

                console.log('index  '+index)
              
                if(this.Process_list[index].rate !=  data[i].hb7_invoice_details[j].tax)
                {
                  console.log('Indifferent Tax rate '+index,data[i].hb7_invoice_details[j].Hb7_product.hsn_code)
                  console.log('i',i)
                  console.log('this.Process_list[index].rate',this.Process_list[index].rate)
                  console.log('data[i].hb7_invoice_details[j].tax',data[i].hb7_invoice_details[j].tax)
                }

              
                this.Process_list[index].total_Qty = this.Process_list[index].total_Qty + data[i].hb7_invoice_details[j].qty;
                this.Process_list[index].total_Qty =  Math.round(this.Process_list[index].total_Qty * 100) / 100;


                this.Process_list[index].Igst = this.Process_list[index].Igst + this.igst;
                this.Process_list[index].Sgst = this.Process_list[index].Igst + this.sgst;
                this.Process_list[index].Cgst = this.Process_list[index].Igst + this.cgst;
                this.Process_list[index].total_taxable_Value = this.Process_list[index].total_taxable_Value +  this.taxable_value;

                this.Process_list[index].total_taxable_Value =  Math.round(this.Process_list[index].total_taxable_Value * 100) / 100;


                this.Process_list[index].total_Value = this.Process_list[index].total_Value + this.total_Value;
                this.Process_list[index].total_Value =  Math.round(this.Process_list[index].total_Value * 100) / 100;
              }


             }
                               
            }


       this.Onload = 3;
      }
    }
             
           
                        


  


