import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.scss'],
})
export class Main_page_Component implements OnInit {
 
  constructor(   
    private router: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService
  ) {}

  ngOnInit(): void {


                   }
   
  
}
