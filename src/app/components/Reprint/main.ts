import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reprint-a4',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Reprint_component  {
  
 uid : number = 0;
 bc : number = 0;
 
  constructor(private _formBuilder: FormBuilder, public ds : DataService,
    private router: Router,public api:ApiService,private route: ActivatedRoute ) { }
    ngOnInit() {
 
       

        console.log('thing', this.route.snapshot.params.uid);

    }
            
      
  
 get_()
 {
    
 }
    

}