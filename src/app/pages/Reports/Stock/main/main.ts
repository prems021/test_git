import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';


import { DataService } from '../../../../services/data.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-report-stocks-main',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Report_Stocks_main_Component implements OnInit {
  loginForm : FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(
    private fb: FormBuilder,
    public ds: DataService,
    public api : ApiService,
    private router: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService
  ) {}

  ngOnInit(): void {


  }
 
   
}
