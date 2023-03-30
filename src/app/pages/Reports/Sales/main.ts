import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';

import { RootObject,Items_sales } from './model';
import { DataService } from '../../../services/data.service';
import { ApiService } from '../../../services/api.service';
import { TableUtil } from '../tableUtil';
@Component({
  selector: 'app-report-sales',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Report_Sales_Component implements OnInit {
  repo_form : FormGroup;
  submitted = false;
  returnUrl: string;
  RootObjects : RootObject;
  Items_sales : Items_sales [] = []
  tomorrow = new Date();
  yesterday = new Date();
  Onload : number = 0 ;
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
  }

  ngOnInit(): void {

    this.repo_form = this.fb.group({
      to_date: [new Date(), [Validators.required]],
      from_date: [new Date(),''],
      com_id : 0
    });
  }
  Search()
  {
    console.log('form',this.repo_form.value);
    this.repo_form.patchValue({"com_id":this.api.user.hb7_company_detail.id})

    this.api.sales_report_common_(this.repo_form.value).subscribe((data:RootObject) => {
      console.log('daa hsn',data);
      // while (this.items_hsn.length > 0) 
      // {
      //   this.items_hsn.pop();                                                                      
      // }
      this.RootObjects = null;
      this.make_sales_table(data)
    })


  }
  make_sales_table(data:RootObject)
  {
    this.RootObjects = data;
    console.log('rt',this.RootObjects);
    for(var i = 0;i<this.RootObjects.data.length;i++)
    {
      if(i==0)
       this.Items_sales.push({Bar_code:this.RootObjects.data[i].Hb7_product.bar_code,Customer_id:this.RootObjects.data[i].hb7_invoice_master.hb7_customer.id,
        "Customer_name":this.RootObjects.data[i].hb7_invoice_master.hb7_customer.name,"Hsn_code":this.RootObjects.data[i].Hb7_product.hsn_code,
      "Id":this.RootObjects.data[i].Hb7_product.id,"Product_name":this.RootObjects.data[i].Hb7_product.product_name,"Quantity":this.RootObjects.data[i].qty,
      "Rate":this.RootObjects.data[i].rate,"Tax_Percentage":this.RootObjects.data[i].Hb7_product.tax_rate,"UQC":this.RootObjects.data[i].Hb7_product.hb7_unit.unit})
      else
      {



        const in_tax = this.Items_sales.findIndex(xyu => xyu.Id == this.RootObjects.data[i].Hb7_product.id)
        if(in_tax < 0)
           {

            this.Items_sales.push({Bar_code:this.RootObjects.data[i].Hb7_product.bar_code,Customer_id:this.RootObjects.data[i].hb7_invoice_master.hb7_customer.id,
              "Customer_name":this.RootObjects.data[i].hb7_invoice_master.hb7_customer.name,"Hsn_code":this.RootObjects.data[i].Hb7_product.hsn_code,
            "Id":this.RootObjects.data[i].Hb7_product.id,"Product_name":this.RootObjects.data[i].Hb7_product.product_name,"Quantity":this.RootObjects.data[i].qty,
            "Rate":this.RootObjects.data[i].rate,"Tax_Percentage":this.RootObjects.data[i].Hb7_product.tax_rate,"UQC":this.RootObjects.data[i].Hb7_product.hb7_unit.unit})

           }
           else
           {

             this.Items_sales[in_tax].Quantity = this.Items_sales[in_tax].Quantity + this.RootObjects.data[i].qty;

             
           }






      }
    }
    

    this.Onload = 6;

  }

  exportTable_sales()
  {
    TableUtil.exportToExcel("ETable_sales");
  }
   
}
