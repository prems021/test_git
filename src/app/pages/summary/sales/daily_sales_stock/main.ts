


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { process_list } from './model';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-summary-sales-daily-stock',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Summary_sales_daily_stock implements OnInit {


  submitted = false;
  sdate : any;
  edate : any;
  public post_mo : any = {sdate :"",com_id:null};
  Onload : number = 1;
  Process_list :  process_list[] = [];
   public columns: Columns[] = [
    { key: 'id', title: 'Uid' },
    { key: 'product_name', title: 'Product' },
    { key: 'unit_code', title: 'Unit' },
    { key: 'Qty_sold', title: 'Qty Sold' },
    { key: 'Total_value', title: 'Net Value' },
    
  ];
 
  configuration: Config;
  va_value: number = 0;;

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
    
    if(this.sdate == null)
    {
      alert('select date range properly')
    }
    else{
        this.post_mo.sdate = this.sdate;    
        this.post_mo.sdate.setDate( this.post_mo.sdate.getDate() + 1);    
        this.post_mo.com_id = this.api.invo_head.com_id ;
        this.api.summary_sales_daily_stock(this.post_mo).subscribe((data:any) => {
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
   

    console.log('...data',data)
     for(var i = 0;i<data.length;i++)
        {

            for(var j = 0;j<data[i].hb7_invoice_details.length;j++)  
             {


               const index = this.Process_list.findIndex(item => item.id == data[i].hb7_invoice_details[j].Hb7_product.id)
             if(index == -1)
              {

               
                this.va_value =  data[i].hb7_invoice_details[j].rate * data[i].hb7_invoice_details[j].qty + (data[i].hb7_invoice_details[j].rate * data[i].hb7_invoice_details[j].qty *  data[i].hb7_invoice_details[j].tax / 100);

                this.va_value =  Math.round(this.va_value * 100) / 100;


                this.Process_list.push({"id": data[i].hb7_invoice_details[j].Hb7_product.id, "product_name": data[i].hb7_invoice_details[j].Hb7_product.product_name,
                "unit_code":data[i].hb7_invoice_details[j].Hb7_product.hb7_unit.UQC_Code,"Total_value": this.va_value,"Qty_sold":data[i].hb7_invoice_details[j].qty})
                
              }
              else
              {
                const value =  data[i].hb7_invoice_details[j].rate * data[i].hb7_invoice_details[j].qty + (data[i].hb7_invoice_details[j].rate * data[i].hb7_invoice_details[j].qty *  data[i].hb7_invoice_details[j].tax / 100);
                this.Process_list[index].Total_value = this.Process_list[index].Total_value + value;
             
                this.Process_list[index].Total_value =  Math.round(this.Process_list[index].Total_value * 100) / 100;

                this.Process_list[index].Qty_sold = this.Process_list[index].Qty_sold + data[i].hb7_invoice_details[j].qty;
              }
             }                               
            }

       this.Onload = 3;
      }
    }
             
           
                        


  


