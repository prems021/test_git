
 

 import { Component, OnInit , Input, OnChanges, SimpleChanges,EventEmitter,Output} from '@angular/core';
 import { Router } from '@angular/router';
 import {FormBuilder, FormGroup, Validators} from '@angular/forms';
 import { ApiService } from './../../../services/api.service';
 import { ToastrService } from 'ngx-toastr';

 @Component({
   selector: 'app-vendor-manage',
   templateUrl: './main.html',
   styleUrls: ['./main.scss']
 })
 export class Vendor_Component implements OnInit,OnChanges {
 
 
  @Input('is_update_vendor') Is_update : boolean;
  @Output()reset_cus_lis = new EventEmitter<any>();

  
   customerForm: FormGroup;
   customer_u_Form: FormGroup;
  
   arrayOfCusValues : any[] =[];
   arrayofVendorValues : any[] = [];
   id : number = 0;
   types = ['NRML','SEZ']; 
   cus_vend_model : any = null ;
   Onload : boolean = false;
   OnUPDATE : boolean = false;
   OnDelete : boolean = false;
   cast_ary : any = [{"id":1,"value":"in-state"},{"id":2,"value":"out-state"},{"id":3,"value":"sez"},{"id":5,"value":"Inter National"}]

   constructor( private fb: FormBuilder, private api :ApiService,private router : Router ,private toastr: ToastrService) { } 
 
   ngOnInit() {
   
     this.get_vendors_only();
 
     this.customerForm = this.fb.group({ 
 
      name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      street : '',
      address_1 : '',
      address_2 :'',
      ph : '',
      cast : 1,
      mob : '',
      email :'',
      gst_in : '', 
      com_id : 0,      
      credit_balance : 0,
      type: 3,
   
       
        
     });
 
  
 
 
    
 
       this.customer_u_Form = this.fb.group({ 
 
       name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
       street : '',      
       address_1 : '',
       address_2 : '',
       email :'',
       gst_in : '',  
       cast : 1, 
       ph:'',
       mob:'',       
       credit_balance : 0,
       type : 3,
       id : 0,
       com_id : 0
            
     });

    
     
   }
 
  
 
   ngOnChanges(changes: SimpleChanges) { 
    if(this.Is_update == true)
    {  
        document.getElementById("Sec_b").click();        
    }
    else
    {     
        document.getElementById("Def_b").click(); 
    }    
  }

  reset_form()
  {
    this.customerForm.reset();
  }
 
 
 
 
   add_customer()
   {
 
    if(this.customerForm.controls.gst_in.value  === null  ||  this.customerForm.controls.gst_in.value === '' )
    {      
     this.customerForm.patchValue({type :  4}) 
    } 
    else
    {
     this.customerForm.patchValue({type :  3})
    }
 
    console.log('val',this.customerForm.value)
    this.customerForm.patchValue({com_id:this.api.user.hb7_company_detail.id})
    this.api.add_customer(this.customerForm.value).subscribe((jsonData) => { this.res_(jsonData)},(err) => console.error(err)); 
          this.Onload = !this.Onload;  
 
   }
 
 
 res_(json:any)
 {
  console.log('res',json);
  if(json.success == true)
    { this.reset_form();
      this.toastr.success(json.msg);
    }
    else { this.toastr.error(json.msg); }     
   this.Onload = !this.Onload;    
   this.reset_cus_lis.emit(true);

   this.get_vendors_only();
 }
 
 

 
 cus_blur_update()
 {
   console.log('vendi',this.cus_vend_model); 
   if(this.cus_vend_model.id != undefined)
   {
    this.customer_u_Form.patchValue({name : this.cus_vend_model.name , id : this.cus_vend_model.id , 
      street : this.cus_vend_model.street , credit_balance : this.cus_vend_model.credit_balance,cast :  this.cus_vend_model.cast,
      email :this.cus_vend_model.email,address_1 :  this.cus_vend_model.address_1, address_2 : this.cus_vend_model.address_2,
      gst_in :this.cus_vend_model.gst_in,type : this.cus_vend_model.type , ph : this.cus_vend_model.ph , mob : this.cus_vend_model.mob  }) ; 
   }
 else
   {
     alert('Select proper Input');
   } 
 }
 
 get_vendors_only()
 {
    this.api.cus_vendor_list_filter_vendor_only()
   .subscribe((jsonData) => { this.json_customers(jsonData)
                       },(err) => console.error(err),);
 }
 
 json_customers(json :any)
   {    
   this.arrayOfCusValues = json;    
   } 
 
   update_customer()
   {
   
     this.OnUPDATE = !this.OnUPDATE;
     if(this.customer_u_Form.controls.gst_in.value  === null  ||  this.customer_u_Form.controls.gst_in.value === '' )
     {       
      this.customer_u_Form.patchValue({type :  4}) 
      this.api.update_customer(this.customer_u_Form.value)
      .subscribe((jsonData) => { this._res_up(jsonData)},(err) => console.error(err),);  
     }
     else
     {
      this.customer_u_Form.patchValue({type :  3}) 
      this.api.update_customer(this.customer_u_Form.value)
      .subscribe((jsonData) => { this._res_up(jsonData)},(err) => console.error(err),);
 
     }
   }
 
 
 
 
 _res_up(json:any)
 {
  this.OnUPDATE = !this.OnUPDATE;
  if(json.success == true)
  { 
    this.toastr.success(json.msg);
    
  }
  else { this.toastr.error(json.msg); 
    
  }     
  this.reset_cus_lis.emit(true);

  this.get_vendors_only();
 }
 
 
 delete_customer()
 
 {
 
   this.api.delete_customer(this.customer_u_Form.value)
      .subscribe((jsonData) => { this._res_del(jsonData)  
                       },(err) => console.error(err),
                        
                       );
 
                       this.OnDelete = !this.OnDelete;
   
 
 }
 
 
 
 _res_del(json:any)
 {
  this.OnDelete = !this.OnDelete;
  if(json.success == true)
  { this.customer_u_Form.reset();
    this.toastr.success(json.msg);
    this.reset_cus_lis.emit(true);
    this.get_vendors_only();
  }
  else { this.toastr.error(json.msg); this.reset_cus_lis.emit(true); }   
   
  
 }
 
 
  openCity(evt, cityName) {
 
   var i, tabcontent, tablinks;
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
     tabcontent[i].style.display = "none";
   }
   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" active", "");
   }
   document.getElementById(cityName).style.display = "block";
   evt.currentTarget.className += " active";
 }
 
 
 
 
    
 }