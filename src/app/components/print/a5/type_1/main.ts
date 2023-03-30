import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-print-a5-type_1',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Printa5Component_type_1  {
  
 b : number = 0;
 bc : number = 0;
 ngOnInit() {
 
 
  }
  constructor(private _formBuilder: FormBuilder,
    private router: Router,public api:ApiService ) { }

}