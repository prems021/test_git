import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Hb7product } from './model';
import { ApiService } from '../../../../services/api.service';
import { TableUtil } from '../../tableUtil';
@Component({
  selector: 'app-report-product-list',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Report_product_list_Component implements OnInit {
  repo_form : FormGroup;
  submitted = false;
  returnUrl: string;
  items_ : Hb7product [] = []
//   RootObjects : RootObject;
  Onload : boolean = false;

  constructor( private fb: FormBuilder,   
    public api : ApiService,
    private router: Router,    
    private ps:NgxPermissionsService
  ) {
   
  }

  ngOnInit(): void {

                                            this.api.asset_listZ.subscribe((jsonData) => { this._get_products(jsonData)},(err) => console.error(err));
                   }         
                  
                  _get_products(json :any)
                  {   
                    this.items_ = json;
                    console.log('items_',this.items_);
                    this.Onload = true;
                  }
  

 export()
  {
    TableUtil.exportToExcel("_pes_list");
  }
   
}
