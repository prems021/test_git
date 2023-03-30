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
export class Gst_report_detailed_Component implements OnInit {
  


  myForm : FormGroup;
 
  Onload : number = 1;
  i : number = 0;
  j : number = 0;
  k: number = 0 ;
  tomorrow = new Date();
  yesterday = new Date();
  public Options = [{"name":"B2C","op":1},{"name":"B2B","op":2}]
  selected: number;
  //options = ['B2B','B2C','HSN']
  constructor(
    private fb: FormBuilder,
    public ds: DataService,
    public api : ApiService,
    private router: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService
  ) {}

  ngOnInit(): void {

    this.selected = 0;

    this.tomorrow.setDate(this.tomorrow.getDate());
    this.yesterday.setDate(this.yesterday.getDate());
   

    this.myForm = this.fb.group({
        to_date: [new Date(), [Validators.required]],
        from_date: [new Date(),''],
        com_id : 0,
        sel_opt : ['B2B']
      });


  }

  select__(i:number)
  {
  this.selected = i;
  console.log('s',this.selected);
  
  
  switch (this.selected) {
                                case 0:
                                   
                                    break;
                                case 1:
                                  
                                    break;
                                case 2:
                                 
                                    break;
                                case 3:
                                 
                                    break;
                                case 4:
                                      
                                        break; 
                                default:
                                    console.log("No such day exists!");
                                    break;
                       }


  }


  Search()
  {
    this.myForm.patchValue({"com_id":this.api.user.hb7_company_detail.id})
    console.log(this.myForm.value);
    this.Onload = 2;
   // this.api.gst_report_detailed(this.myForm.value).subscribe((data) => {
    //   if(this.myForm.controls.sel_opt.value == 'B2B')
    //   {
        

        // while (this.tax_info.length > 0) 
        // {
        //   this.tax_info.pop();                                                                      
        // }


       // this.get_res_gst_in(data);
    //   }
    //   else
    //   {

    //   }
   // })
  }

  get_res_gst_in(data:any)
  {
      console.log('data',data)

  }


 exportTable_sales(){
  TableUtil.exportToExcel("ExampleTable_");
}

exportTable_b2c(){
  TableUtil.exportToExcel("ExampleTable_b2c");
}

exportTable_hsn(){
  TableUtil.exportToExcel("ExampleTable_hsn");
}



   
}
