import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Change_passwordComponent implements OnInit {
 
    loForm : FormGroup;
  constructor(private fb: FormBuilder,public api : ApiService,public ps: NgxPermissionsService,public rs : Router) { }

  ngOnInit() {
    this.loForm = this.fb.group({
        old_pass: ['', [Validators.required]],
        new_pass_1: ['', Validators.required],
        new_pass_2: ['', Validators.required],
      });
    }
    onFormSubmit(val:any)
    {
      
      if( this.loForm.controls.new_pass_1.value == this.loForm.controls.new_pass_2.value)
      {
        this.api.change_password(this.loForm.value)
        .subscribe((jsonData) => { this._get_res(jsonData)
                        },(err) => console.error(err),
                       
                        );
      }
      else
      {
        alert('Password mismatch');
      }
    }
    _get_res(res:any)
    {
        console.log('res',res);
        alert(res.msg);
        if(res.success == true)
        {
          
            this.ps.flushPermissions();
            this.rs.navigate(['login']);
            localStorage.removeItem('token');
          
        }

    }
  }


