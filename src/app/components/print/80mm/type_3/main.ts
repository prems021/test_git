

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ApiService } from '../../../../services/api.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-print-eighty-type-3',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class PrinteightyComponent_type_3  {
  
 b : number = 0;
 bc : number = 0;
 ngOnInit() {
  console.log('Items 80mm created');
 
  }
  constructor(private _formBuilder: FormBuilder,public api:ApiService,
    private router: Router,public ds:DataService ) { }

    ngOnDestroy() {
      console.log('Items destroyed');
    }

customer_statement()
{
  this.router.navigate(['/customer-statement']);
}


}