

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ApiService } from '../../../../services/api.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-print-a4-type-9',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Printa4Component_type_9  {
  
 b : number = 0;
 bc : number = 0;
 page_count : number = 1;
 @Input('ia') len : number;
 @Input('print') print : boolean;
 
  constructor(private _formBuilder: FormBuilder, public ds : DataService,
    private router: Router,public api:ApiService ) { }
    ngOnInit() {
 
    

         }
  
 get_()
 {
    
 }

 async  ngOnChanges(changes: SimpleChanges) {
  
 

  if(this.len > 21)
  {
    console.log('prri..inside..',this.print);
    this.page_count = 1;   

      if(this.print == true)
       {
        console.log('page..inside..',this.page_count);
        await  this.do_load_g() 
        setTimeout(() => 
          {   
            console.log(' 1  .inside..',this.page_count);  
            window.print();   
            this.page_count = 2;  

          },
           400);
           console.log('2  inside..',this.page_count); 
           setTimeout(() => 
           {  
              
            console.log('3 .inside..',this.page_count);  
             window.print();      
           },
            800);
            console.log('4..',this.page_count); 

      }

  }

  else
  {
    this.page_count = 1;
    if(this.print == true)
    {
      await  this.do_load_l() 
    setTimeout(() => 
    {     
      window.print();      
    },
    400);

  }
  }
  
}

 async do_load_l()
{
  console.log('loaded........l.')
  return true;
}

async do_load_g()
{
  console.log('loaded........g.')
  return true;
}
    

}