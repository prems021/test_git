import { Component, OnInit,Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../services/api.service'
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Invo_list } from './model';

@Component({
  selector: 'app-view-purchase-bills',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class View_bills_purchase_Component implements OnInit {

 


 public configuration: Config;
 public columns: Columns[];
 view : number = 0;
  

  public data : Invo_list[];





  constructor(private api : ApiService,private formBuilder: FormBuilder, private rs: Router,
     private renderer: Renderer2, private cdr: ChangeDetectorRef  ) {

    
   }  
 

 
   ngOnInit(): void {



    this.get_purchase_bills();


     this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    // ... etc.
    this.columns = [
      { key: 'id', title: 'Uid' },
      { key: 'hb7_customer.name', title: 'Name' },
      { key: 'invoice_date', title: 'Date' },
      { key: 'invoice_no_pur', title: 'Invoice No' },
      { key: 'type', title: 'Type' },
      { key: 'grand_amt', title: 'Amount' },
      
     
     
    ];
  

  }






  get_purchase_bills()
  {
    this.api.get_all_purchases()
    .subscribe((jsonData) => { this._get_bills(jsonData)
            },(err) => console.error(err),
             
            );
  }
 


_get_bills(json :any)
{               

 this.data = json;
 this.view = 1;
          
console.log('bills',this.data)
}


eventEmitted($event) {

  console.log('event',$event)

  if($event.event == 'onSearch' || $event.event == 'onPagination')
  {
      
  }
  else
  {
           
           
             this.api.invoice_id = $event.value.row.id;     
             this.rs.navigate(['/home/update-purchase']);

  }


}




  

}

