import { Component, OnInit,Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../services/api.service'
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Invo_list } from './model';

@Component({
  selector: 'app-view-perfoma-bills',
  templateUrl: './perfoma.html',
  styleUrls: ['./perfoma.scss']
})
export class Viewperfoma_InvoiceComponent implements OnInit {

 


   public configuration: Config;
  public columns: Columns[];
  view : boolean = false;
  

  public data : Invo_list[];
  public data_c : Invo_list[];
  public selected = -1; 

  public Options = [{"name":"All","op":1},{"name":"B2C","op":2},{"name":"B2B","op":3},{"name":"SEZ","op":3},{"name":"IGST","op":3}]


  constructor(private api : ApiService,private formBuilder: FormBuilder, private rs: Router,
     private renderer: Renderer2, private cdr: ChangeDetectorRef  ) {

    
   }  
 

 
   ngOnInit(): void {

    this.selected = 0;

    this.get_bills();


     this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    // ... etc.
    this.columns = [
      { key: 'id', title: 'Uid' },
      { key: 'hb7_customer.name', title: 'Name' },
      { key: 'invoice_date', title: 'Date' ,placeholder:'YYYY-MM-DD'},
      { key: 'invoice_no', title: 'Invoice No' },
      { key: 'grand_amt', title: 'Amount' },
     
     
    ];
  

  }

  select__(i:number)
  {
  this.selected = i;
  console.log('s',this.selected);
  this.data = this.data_c;
  
  switch (this.selected) {
                                case 0:
                                    this.data = this.data_c
                                    break;
                                case 1:
                                  this.data = this.data_c.filter(xy=>xy.type == 'B2C')
                                    break;
                                case 2:
                                  this.data = this.data_c.filter(xy=>xy.type == 'B2B')
                                    break;
                                case 3:
                                  this.data = this.data_c.filter(xy=>xy.type == 'SEZ')
                                    break;
                                case 4:
                                      this.data = this.data_c.filter(xy=>xy.type == 'IGST')
                                        break; 
                                default:
                                    console.log("No such day exists!");
                                    break;
                       }


  }


  get_bills()
  {
    this.api.get_all_perfoma_invoices()
    .subscribe((jsonData) => { this._get_bills(jsonData)
            },(err) => console.error(err),
             
            );
  }
 


_get_bills(json :any)
{              
 this.data = json;
 this.data_c = json;
 this.view = true;          
console.log('bills',this.data);

}


eventEmitted($event) {

  console.log('event',$event)

  if($event.event == 'onSearch' || $event.event == 'onPagination')
  {
      
  }
  else
  {
           
           
             this.api.invoice_id = $event.value.row.id;
      
      
             this.rs.navigate(['/home/update-perfoma']);

  }


}




  

}

