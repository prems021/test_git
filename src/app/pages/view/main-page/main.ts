import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-main-view-page',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Main_view_page_Component implements OnInit {
 
  constructor(   
    private router: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService
  ) {}

  ngOnInit(): void {


                   }
   
  
}
