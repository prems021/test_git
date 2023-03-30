import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
 import { report_model } from './model';
import { DataService } from '../../../../services/data.service';
import { ApiService } from '../../../../services/api.service';
import { TableUtil } from '../../../summary/table_utl';
import { ExportToCsv } from 'export-to-csv';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
@Component({
  selector: 'app-report-sales-to-customer',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Report_Sales_to_customerComponent implements OnInit {
    report_form : FormGroup;
    edate : any;
    sdate : any;
    total_pay_cycle : number = 0;
    pay_cycle_amt : number = 0;
    configuration: Config;
    total_pay : number = 0;

    total_due : number = 0;
    total_value : number = 0;

  submitted = false;
  returnUrl: string;

  Report_model : report_model [] = []
  tomorrow = new Date();
  yesterday = new Date();
  Onload : number = 1 ;
  arrayOfCusValues : any [] = [];
  public post_mo : any = {sdate :"",edate :"",fy_id:"",com_id:null,cus_id:null};

  public columns: Columns[] = [
    { key: 'si', title: 'Serial No' },
    { key: 'invoice_date', title: 'Invoice Date' },
    { key: 'invoice_generation_date', title: 'Invoice Generated At' },
    { key: 'invoice_value', title: 'Invoice value' },
    { key: 'total_payed', title: 'Total Payed' },
    { key: 'total_pay_cycle', title: 'Payment cycle' },
    { key: 'total_due', title: 'Due' },

    
    
  ];


  constructor(
    private fb: FormBuilder,
    public ds: DataService,
    public api : ApiService,
    private router: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService
  ) {
    this.tomorrow.setDate(this.tomorrow.getDate());
    this.yesterday.setDate(this.yesterday.getDate());

    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnInit(): void {

    this.report_form = this.fb.group({
      to_date: [new Date(), [Validators.required]],
      from_date: [new Date(),''],
      com_id : 0,
      cus_id : 0
    });
    this.get_customers_only();


    this.configuration = { ...DefaultConfig };
    
    this.configuration.paginationEnabled = false;
    this.configuration.rows = 50;
    this.configuration.infiniteScroll = true;


  }
  generate()
  {

    this.post_mo.sdate = this.sdate;        
    this.post_mo.edate = this.edate;  
    this.post_mo.sdate.setDate( this.post_mo.sdate.getDate() + 1);
    this.post_mo.edate.setDate( this.post_mo.edate.getDate() + 1);
    this.post_mo.fy_id =  this.api.invo_head.fy_id
    this.post_mo.com_id = this.api.invo_head.com_id ;

    // this.sdate = this.sdate.getDate() + 1;
    // this.edate = this.sdate.getDate() + 1;
    // this.report_form.patchValue({"com_id":this.api.user.hb7_company_detail.id ,"from_date":this.sdate,"to_date":this.edate })

  

    console.log('form',this.post_mo);
     this.api.sales_report_sales_to_specific_customer_transaction(this.post_mo).subscribe((data:any) => {
      console.log('daa ',data);
       while (this.Report_model.length > 0) 
       {
         this.Report_model.pop();                                                                      
       }    

       this.get_res_(data)
    })



  }
  


  get_res_(data:any)
  {
   

    console.log('...data',data);
    this.total_pay = 0;
    this.total_due = 0;
      for(var i = 0;i<data.length;i++)
         {

         
        this.total_pay_cycle = 0;
        this.pay_cycle_amt = 0;


                for(var j = 0;j<data[i].hb7_trans_masters.length;j++)  
                   {

                    this.total_pay_cycle = this.total_pay_cycle + 1;
                    this.pay_cycle_amt = this.pay_cycle_amt + data[i].hb7_trans_masters[j].amount;

                   }
                   this.Report_model.push({"invoice_date":data[i].invoice_date,"invoice_generation_date":data[i].createdAt,
                   "invoice_value":data[i].grand_amt,"total_due": data[i].grand_amt - this.pay_cycle_amt,"si":i+1,
                   "total_pay_cycle":this.total_pay_cycle,"total_payed": this.pay_cycle_amt})

                   this.total_pay = this.total_pay + this.pay_cycle_amt;
                   this.total_due = this.total_due + data[i].grand_amt - this.pay_cycle_amt;
                   this.total_value =  this.total_value  + data[i].grand_amt;


       
      }
      this.Report_model.push({"invoice_date":null,"invoice_generation_date":null,
      "invoice_value":null,"total_due":null,"si":null,
      "total_pay_cycle":null,"total_payed":  null})

      this.Report_model.push({"invoice_date":null,"invoice_generation_date":null,
      "invoice_value": this.total_value,"total_due":  this.total_due,"si":null,
      "total_pay_cycle":null,"total_payed":  this.total_pay})


      this.Onload = 3;
  }
      





  exportTable_sales()
  {
    TableUtil.exportToExcel("ETable_sales");
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

    csvExporter.generateCsv(this.Report_model);
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



    
    _cus_selected(ev:any)
    {
      
     
      if(ev.id == undefined || ev.id == undefined || ev.id <= 1 || ev.id == null )
        {
                      alert('Invalid Customer');                                        
        }
        else
        {
          
           
            this.report_form.patchValue({"cus_id": ev.id})   
            this.post_mo.cus_id = ev.id;  
            


        }
     }


customCallback(e:any)
{
alert('Incorrect selection')
}


}
