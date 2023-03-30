import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import {AngularMyDatePickerDirective, DefaultView, IAngularMyDpOptions,IMyInputFieldChanged, 
  IMyDateModel, IMyMarkedDate, CalAnimation} from  'angular-mydatepicker';
  import { ShortcutInput, ShortcutEventOutput,KeyboardShortcutsComponent  } from "ng-keyboard-shortcuts";
import { CastExpr } from '@angular/compiler';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';
  

@Component({
  selector: 'app-update-purchase-test',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Purchase_test_Component implements OnInit {

  isLinear = true;
  formNameGroup : FormGroup;
  formPasswordGroup : FormGroup;
  formEmailGroup : FormGroup;
  formPhoneGroup : FormGroup;




  constructor(   
    private rs: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService,
    public api : ApiService,
    public ds : DataService,
    private fb: FormBuilder
  ) { this.createForm(); }


  
  createForm() {
    this.formNameGroup  = this.fb.group({
      userName: ['', Validators.required]
    });
  
    this.formPasswordGroup  = this.fb.group({
      passWord: ['', Validators.required]
    });
    this.formEmailGroup  = this.fb.group({
      emailID: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.formPhoneGroup  = this.fb.group({
      mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
    });
    }
 
   
  

  ngOnInit(): void {

     


 
  


                   }

                 


  
}


