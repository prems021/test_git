














import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

import { stock_list, Hb7product } from '../model';
//import { TableUtil } from '../../../table_utl';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-summary-stocks-current-date',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Summary_stocks_current_date implements OnInit {


  submitted = false;
  sdate : any;
  edate : any;
  public post_mo : any = {sdate :"",edate:"",com_id:null}
  Onload : number = 1;
  Process_list :  stock_list[] = [];
  index_si : number = 0;

  pro_stock_qty : number = 0;
  items_ : Hb7product [] = []
  count : number = 0;



  //summary_list : b2cs_summary_list[] = [];
  
  public columns: Columns[] = [
    { key: 'si_no', title: 'si.No' },
    { key: 'bar_code', title: 'Barcode' },
    { key: 'product_name', title: 'Product Name' },
    { key: 'unit_code', title: 'UQC' },
    { key: 'op_bal', title: 'Opening Stock' },    
    { key: 'pur_tot', title: 'Total Purchases' },
  
    { key: 'sales_tot', title: 'Total Sales' }   ,
    { key: 'rem_count', title: 'Stock Available' }  
    
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
    this.configuration.paginationEnabled = true;
    this.configuration.rows = 50;
   // this.configuration.infiniteScroll = true;

   this.api.asset_listZ.subscribe((jsonData) => { this._get_products(jsonData)},(err) => console.error(err));
  }

  _get_products(json :any)
{   
 this.items_ = json;
 
 this.items_.forEach(element => {
  
  if(element.id == null || element.id == NaN || element.id <= 0 )
    {  }
    else
     {
      this.index_si = this.index_si + 1;
      this.Process_list.push({"id":element.id,"bar_code":element.bar_code,"op_bal":null,"product_name":element.product_name,"pur_tot":null,"purchase_ret_tot":null,
      "sales_ret_tot":null,"sales_tot":null,"si_no":this.index_si,"unit_code":element.hb7_unit.UQC_Code,"rem_count": 0 })
      
     }
  
 });




// this.Onload = true;
}


  setDate(ev:any)
  {
      console.log('e',ev)
  }

  generate()
  {
    this.Onload  = 2;
    if(this.edate == null)
    {
      alert('select date range properly')
    }
    else{
       
        this.post_mo.edate = this.edate;
        this.post_mo.edate.setDate( this.post_mo.edate.getDate() + 1);
        
         this.Process_list.forEach(elem => {
        
            this.api.get_stock_qty_report(elem.id,this.post_mo.edate).subscribe((jsonData) => { this._get_stock_qty_value(jsonData)
              },(err:any) => console.error(err));
        
         })
       
        
    }    
  
  }

  _get_stock_qty_value(data :any)
  {   
       console.log('res......',data);
      this.pro_stock_qty = 0;
      this.pro_stock_qty = (data.op_bal + data.pur_tot + data.sales_ret_tot) - (data.purchase_ret_tot +  data.sales_tot)     
     const index = this.Process_list.findIndex(xy=>xy.id == data.req_id)      
     this.Process_list[index].op_bal =   data.op_bal;   
     this.Process_list[index].pur_tot =   data.pur_tot;    
     this.Process_list[index].purchase_ret_tot =   data.purchase_ret_tot;               
     this.Process_list[index].sales_ret_tot =   data.sales_ret_tot;    
     this.Process_list[index].sales_tot =   data.sales_tot;  
     this.Process_list[index].rem_count =   this.pro_stock_qty;  
     this.count = this.count + 1;

     if(this.count == this.index_si)
     {
      this.Onload = 3;
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
 
 
    
             
           
                        

   
         


  





  // check_stock_qty()
  // {
  //   if(this.pro_id == null || this.pro_id == NaN || this.pro_id <= 0 )
  //   {
  //     this.toastr.error('select any Product');
  //   }
  //   else
  //   {
  //     this.api.get_stock_qty(this.pro_id).subscribe((jsonData) => { this._get_stock_qty_value(jsonData)
  //     },(err:any) => console.error(err));
  //   }


  // }



}