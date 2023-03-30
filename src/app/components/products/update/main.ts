import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { p_master } from './model';
import { PdtCategory,Unit } from '../../../models/customer';
@Component({
  selector: 'app-update-product',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Update_productComponent implements OnInit {

 
  
  
  product_add_Form : FormGroup;
  arrayOfproductValues : any[] =[];
  d_ : number = 0;
  view_head : boolean = false;
  item_flag : boolean = false;
 
  productForm : FormGroup;

  PdtCategory_ary : PdtCategory[];
  Unit_ary : Unit[];
  constructor(private api : ApiService ,private fb : FormBuilder ) {

    
   }  
 

 

  ngOnInit(): void {

    

      this.get_all_products();
      this.get_all_units();
      this.get_all_category()
      this.productForm = this.fb.group({ 

        product_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],     
        mrp : 0,       
        bar_code : [''],
        unit : [''],
        rate:[''],
        net_price:0, 
        opening_stock:0,  
        tax_rate:0, 
        id:0,
        category_id : 0, 
        unit_id:0,
        hsn_code : null,

        
      
      });
    
      
  }

  get_all_units()
  {
      this.api.get_all_units()
     .subscribe((jsonData) => { this.get_units_list(jsonData)
                     },(err) => console.error(err),
                    
                     );
  }

 
 get_units_list(js:any)
 {
  this.Unit_ary = js
     
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
      
  
  Update_all()
  {
      this.api.update_product(this.productForm.value)
     .subscribe((jsonData) => { this.get_ress_update(jsonData)
                     },(err) => console.error(err));


  }
  get_ress_update(json:any)
  {
    console.log('res',json);
 
       alert(json.msg);
       this.get_all_products();

       this.productForm.reset();
      
   
  }
  article_blur(ss:any)
  {
        let s : any; 

s = this.arrayOfproductValues.filter(xi=> xi.id == ss);
this.productForm.patchValue({id:ss})

console.log('fl ar',s);

      this.productForm.patchValue({product_name : s[0].product_name , category_id : s[0].category_id ,
        bar_code : s[0].bar_code,hsn_code:s[0].hsn_code,
        rate : s[0].rate, tax_rate :  s[0].tax_rate,
        net_price :  s[0].rate + ( (s[0].rate  * s[0].tax_rate )/100),
                mrp : s[0].mrp,opening_stock : s[0].opening_stock,
                unit_id : s[0].unit_id  });
                console.log('p form', this.productForm.value);
 

               

  }




  get_all_products()
 {
 	  this.api.get_all_assets()
    .subscribe((jsonData) => { this.get_product_list(jsonData)
                    },(err) => console.error(err),
                   
                    );
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
  this.PdtCategory_ary = json;
   
  }


 get_product_list(js:any)
{
   console.log(js)
   this.arrayOfproductValues = js;
   console.log('pdts',this.arrayOfproductValues)
   this.view_head = true;

}

Delete_all()
{

  console.log('val',this.productForm.value);

  this.api.delete_product(this.productForm.controls.id.value)
  .subscribe((jsonData) => { this.get_ress_update(jsonData)
                  },(err) => console.error(err),
                 
                  );
    
}

desc_blur(it:any)
{

}

   
 
  



}

