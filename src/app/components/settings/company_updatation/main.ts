

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-settings-company-updation',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Company_updation_Component implements OnInit {
    ComForm : FormGroup;
    Onload : number = 0;

    imageSrc: string;

    myForm = new FormGroup({
     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
     file: new FormControl('', [Validators.required]),
     fileSource: new FormControl('', [Validators.required])
   });


  constructor(  private fb: FormBuilder,  public api : ApiService ) { }

  ngOnInit() {

    this.get_details()


    this.ComForm = this.fb.group({
        company_name : ['', [Validators.required]],
        company_gstin : ['', Validators.required],
        company_email :  ['', Validators.email],
        company_street : [''],
        company_address_1 : [''],
        company_address_2 : [''],
        company_ph_1 : [''],
        company_ph_2 : [''],
        company_bank_name : [''],
        company_bank_ac_no : [''],
        company_bank_branch_name : [''],
        company_bank_ifsc_code : [''],

      });

  }

  get f(){
    return this.myForm.controls;
  }
   
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.myForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
   
  submit(){
    console.log(this.myForm.value);
    this.api.upload_logo(this.myForm.value)
    .subscribe((jsonData) => {  console.log(jsonData) },(err) => console.error(err));
  }

  get_details()
  {
    this.api.get_company_details()
    .subscribe((jsonData) => { this._get_company_details(jsonData)
                    },(err) => console.error(err),
                   
                    );
  }

  _get_company_details(js:any)
  {
    console.log('comrs',js)
    this.ComForm.patchValue({company_name:js.company_name,company_gstin:js.company_gstin,company_email:js.company_email,company_street:js.company_street
      ,company_address_1 : js.company_address_1,company_address_2: js.company_address_2,company_ph_1:js.company_ph_1,company_ph_2:js.company_ph_2,
      company_bank_name:js.company_bank_name,company_bank_ac_no:js.company_bank_ac_no,company_bank_branch_name:js.company_bank_branch_name,
      company_bank_ifsc_code:js.company_bank_ifsc_code});
      this.Onload = 1;
  }

  onFormSubmit()
  {
    this.Onload = 2  

    this.api.update_company_details(this.ComForm.value)
    .subscribe((jsonData) => { this._update_company_details(jsonData)
                    },(err) => console.error(err),
                   
                    );

  }
  _update_company_details(js:any)
  {
    if (js.success == true)
    {
      this.Onload = 3
    }
     
  }
 

  


}
