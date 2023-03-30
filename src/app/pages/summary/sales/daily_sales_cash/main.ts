


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { process_list } from './model';
//import { TableUtil } from '../../../table_utl';
import { ExportToCsv } from 'export-to-csv';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
@Component({
  selector: 'app-summary-sales-daily-cash',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Summary_sales_daily_cash implements OnInit {


  submitted = false;
  sdate : any;
  total_sale_value : number = 0;
  public post_mo : any = {sdate :"",com_id:null};
  Onload : number = 1;
  Process_list :  process_list[] = [];
  total_sale_ret_value: number = 0;
  configuration: Config;

  public columns: Columns[] = [
    { key: 'id', title: 'Uid' },
    { key: 'Invoice_no', title: 'Invoice no' },    
    { key: 'Customer_name', title: 'Customer name' },
    { key: 'Type', title: 'Type' },
    { key: 'mode', title: 'mode' },
    { key: 'Total_value', title: 'Total value' },
    
  ];
  
  constructor(public api : ApiService) {
   
    }

  ngOnInit(): void { 
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.paginationEnabled = false;
    this.configuration.rows = 50;
    this.configuration.infiniteScroll = true;

  }

  generate()
  {
    
    if(this.sdate == null)
    {
      alert('select date range properly')
    }
    else{
        this.post_mo.sdate = this.sdate ;

        console.log('date b', this.post_mo.sdate)
        
        
          this.post_mo.sdate.setDate( this.post_mo.sdate.getDate() + 1);

        console.log('date a', this.post_mo.sdate)

        this.post_mo.com_id = this.api.invo_head.com_id ;
        this.api.summary_sales_all_cash_daily(this.post_mo).subscribe((data:any) => {
          this.get_res_(data);
        });
    }
  }

  export()
  {
    //TableUtil.exportToExcel("e_gst_7");
  }
  setDate(ev:any)
  {
      console.log('e',ev)
  }

 
  get_res_(data:any)
  {
    this.total_sale_value = 0;
    this.total_sale_ret_value = 0;

    console.log('...data',data)
     for(var i = 0;i<data.length;i++)
        {

          this.Process_list.push({"id":data[i].id,"Customer_name":data[i].hb7_customer.name,"Invoice_no":data[i].invoice_no,"Total_value":data[i].grand_amt,
        "Type":data[i].type,"mode":data[i].mode})

         
           

                  if(this.Process_list[i].mode == 'IN')
                  {
                      this.total_sale_value = this.total_sale_value + this.Process_list[i].Total_value
                  }
                  if(this.Process_list[i].mode == 'SR')
                  {
                    this.total_sale_ret_value = this.total_sale_ret_value + this.Process_list[i].Total_value
                  }


                               
        }

        this.Process_list.push({"id":null,"Customer_name":null,"Invoice_no":'Summary',"Total_value":null ,
        "Type":null,"mode":null})

        this.Process_list.push({"id":null,"Customer_name":'Total Sales',"Invoice_no":null,"Total_value":this.total_sale_value ,
        "Type":null,"mode":'Invoice'})

        this.Process_list.push({"id":null,"Customer_name":'Total Sales',"Invoice_no":null,"Total_value":this.total_sale_ret_value ,
        "Type":null,"mode":'Sales Return'})


       
       
      


       this.Onload = 3;




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
    }
             
           
                        


  


