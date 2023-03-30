import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ApiService } from '../../../../services/api.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-print-credit-voucher-type_1',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Print_credit_voucher_type_1  {
  
 b : number = 0;
 bc : number = 0;
 
  constructor(private _formBuilder: FormBuilder, public ds : DataService,
    private router: Router,public api:ApiService ) { }
    ngOnInit() {
 
        console.log('cus',this.api.invo_head);
        this.api.query_demo.num_to_string = this.api.cdmodels.amount;
        this.api.get_figure(this.api.query_demo).subscribe((jsonData) => { this.getjson87(jsonData)},(err) => console.error(err), ); 

       }
         getjson87 (p:any)
         {   
         this.api.cdmodels.figure_amt = p.msg;    
         }
  
 get_()
 {
    
 }
    

}