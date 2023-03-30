

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ApiService } from '../../../../services/api.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-print-eighty-type-2',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class PrinteightyComponent_type_2  {
  
 b : number = 0;
 bc : number = 0;
 ngOnInit() {
 
 
  }
  constructor(private _formBuilder: FormBuilder,public api:ApiService,
    private router: Router,public ds:DataService ) { }


customer_statement()
{
  this.router.navigate(['/customer-statement']);
}


}