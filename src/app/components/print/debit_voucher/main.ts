import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-print-debit-voucher-type_1',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Print_debit_voucher_type_1  {
  
 b : number = 0;
 bc : number = 0;
 
  constructor(private _formBuilder: FormBuilder, public ds : DataService,
    private router: Router,public api:ApiService ) { }
    ngOnInit() {
    }
        
       
  
 get_()
 {
    
 }
    

}