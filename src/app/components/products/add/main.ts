import { Component, OnInit ,OnChanges, SimpleChanges,EventEmitter,Output} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PdtCategory,Unit } from '../../../models/customer';
@Component({
  selector: 'app-add-product',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Add_productComponent implements OnInit {

  @Output()product_listchange = new EventEmitter<any>();
  modal_6 : any;
  modal_7 : any;
  modal_22 : any;
  cats :any[] = ['nos'];
  product_add_Form : FormGroup;
  productForm: FormGroup;
  Unit_Form : FormGroup;
  snak_msg : string = '';
  Onload : boolean = false;
  d_ : number = 0;
  
  PdtCategory_ary : PdtCategory[];
  Unit_ary : Unit[];
  types :  any[] = ['General'];
  load_cat_flag : boolean = false;
  load_unit_flag : boolean = false;
  constructor(private api : ApiService ,private fb : FormBuilder ) {

    
   }  
 

 

  ngOnInit(): void {

    this.modal_6 = document.getElementById("myModal_6");
    this.modal_7 = document.getElementById("myModal_7");
    this.modal_22 = document.getElementById("myModal_22");
    this.productForm = this.fb.group({        
        mrp : 0,
        bar_code : null, 
        product_name : null,     
        description : null,
        hsn_code : null,
        opening_stock : 0, 
        category_id : 0,      
        rate: 0,
        tax_rate:5,
        net_price :0,
        unit_id:0,
          
        
      
      });
      this.product_add_Form = this.fb.group({ 

        cat_name : ['']
      
      })
      this.Unit_Form = this.fb.group({ 

        unit : ['']
      
      })

 console.log('I am .....................Here');

      this.get_all_units();
      this.get_all_category();
      
  }

  add_product()
  {
    this.Onload = !this.Onload;  
   // this.productForm.patchValue({category_id : this.productForm.get('cat_model').value})
    this.api.add_product(this.productForm.value)
    .subscribe((jsonData) => { this.get_res_pro(jsonData)
                    },(err) => console.error(err),
                   
                    );
      
  }
  open_modal()
  {
    
    this.modal_6.style.display = "block";
  }


  open_modal_add_category()
  {
    this.modal_22.style.display = "block";
  }

  open_modal_unit()
  {
    
    this.modal_7.style.display = "block";
  }
  close_modal_unit()
  {
   this.modal_7.style.display = "none";
  }
  close_modal()
 {
  this.modal_6.style.display = "none";
 }

 close_modal_add_category()
 {
  this.modal_22.style.display = "none";
 }
 add_product_category()
 {
   console.log('clicked')
   this.api.add_product_category(this.product_add_Form.value)
   .subscribe((jsonData) => { this.get_res_cat(jsonData)
                   },(err) => console.error(err),
                  
                   );
 }
 get_res_cat(json:any)
 {  
  console.log('fur',json)
    alert(json.msg);
    this.get_all_category();

 }
 get_res_pro(json:any)
 {
  this.Onload = !this.Onload;  
  alert(json.msg);
 
  if(json.success == true)
  {
    this.productForm.reset();
  }

  this.product_listchange.emit(true);
   
 }

 get_all_category()
 {
   this.api.get_product_category()
   .subscribe((jsonData) => { this.get_res_cat_list(jsonData)
                   },(err) => console.error(err),
                  
                   );

 }
 get_res_cat_list(json:any)
 {
   console.log('json',json);
   this.PdtCategory_ary = json;
   this.load_cat_flag = true;
   console.log('ddd',this.PdtCategory_ary);

  

   
  }

  add_unit() 
  {
    
   this.api.add_unit(this.Unit_Form.value)
   .subscribe((jsonData) => { this.get_res_unit(jsonData)
                   },(err) => console.error(err),
                  
                   );
  }
  get_res_unit(json:any)
  {
    alert(json.msg);
    this.get_all_units();
  }



 cal_price()
 {
   this.d_ = this.productForm.controls.net_price.value * 100 / (100 + this.productForm.controls.tax_rate.value);
   this.productForm.patchValue({rate : this.d_ });
 }

 cal_net_price()
 {
  this.d_ =  this.productForm.controls.rate.value + (this.productForm.controls.rate.value * this.productForm.controls.tax_rate.value)/100;
  this.productForm.patchValue({net_price : this.d_ });
 }

 get_all_units()
 {
  console.log('I am .....................Here inside');
 	  this.api.get_all_units()
    .subscribe((jsonData) => { this.get_units_list(jsonData)
                    },(err) => console.error(err),);
 }


get_units_list(js:any)
{
  console.log('unit................z',js)
 this.Unit_ary = js;
  this.load_unit_flag = true;
}

reset_form()
{
  this.productForm.reset();
}

}

