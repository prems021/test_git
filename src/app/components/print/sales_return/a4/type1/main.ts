

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ApiService } from '../../../../../services/api.service';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-credit-note-a4-type-1',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Credit_note_a4Component_type_1  {
  
 b : number = 0;
 bc : number = 0;
 
  constructor(private _formBuilder: FormBuilder, public ds : DataService,
    private router: Router,public api:ApiService ) { }
    ngOnInit() {
 
                   console.log('cus',this.api.invo_head);
               }
  
 get_()
 {
    
 }
    

}