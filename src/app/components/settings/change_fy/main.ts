import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-fy',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Change_fy_Component implements OnInit {
 
  finYearForm : FormGroup;
  Onload : number = 1;

  financialYears = ['FY22-23','FY23-24'];

    fetchData = [{"title":"saurabh","description":"dd","tagline":"tt","date":"dd"},{"title":"aman","description":"dd","tagline":"tt","date":"dd"},{"title":"jessica","description":"dd","tagline":"tt","date":"dd"},
    {"title":"rosh","description":"dd","tagline":"tt","date":"dd"}];

    rows = [
       
      ];

  selectedIndex = -1;
  show: boolean = false;
  row: { id: any; name: any; finYear: any; selected: any; };


  constructor(private fb: FormBuilder,public api : ApiService,public ps: NgxPermissionsService,public rs : Router) { }

  ngOnInit() {

    this.api.get_fy_list()
    .subscribe((jsonData) => { this._get_res_fy_list(jsonData)},(err) => console.error(err));   

    this.finYearForm = this.fb.group({     
      fy_string: ['', [Validators.required, Validators.maxLength(20)]],
      fy :  ['', [Validators.required, Validators.maxLength(20)]],
      });
    }


    _get_res_fy_list(data:any)
    {
      console.log(data)
      for(var i = 0;i<data.length;i++)
      {
        this.row = { id : data[i].id, name : data[i].fy_string , finYear : data[i].fy , selected : data[i].is_default }
        this.rows.push(this.row);
      }

    }
 

      selectRow(index: number,id:number): void {
        if (this.selectedIndex === index) {
          this.selectedIndex = -1;
        } else {
          this.selectedIndex = index;
        }

        console.log(id)
      }
    
      printSelectedId() {
        if (this.selectedIndex >= 0) {
          const selectedRow = this.rows[this.selectedIndex];
          console.log(`Selected ID: ${selectedRow.id}`);
        }
      }

      set_default(row:any)
      {
        this.api.set_fy_as_default(row.id).subscribe((jsonData) => { this._get_res_def(jsonData)},(err:any) => console.error(err));
      }
      _get_res_def(res:any)
      {
        console.log(res)
        alert(res.msg);
        if(res.success == true)
        {
          
           this.ps.flushPermissions();
           this.rs.navigate(['login']);
           localStorage.removeItem('token');
          
        }
      }

      onSubmit() {
        if (this.finYearForm.valid) {
          this.api.add_new_fy(this.finYearForm.value)
        .subscribe((jsonData) => { this._get_res(jsonData)
                        },(err) => console.error(err),
                       
                        );
        }
      }

   
    _get_res(res:any)
    {
        console.log('res',res);
        alert(res.msg);
        if(res.success == true)
        {
          
           // this.ps.flushPermissions();
            this.rs.navigate(['home/settings']);
           // localStorage.removeItem('token');
          
        }

    }

    open_modal_add_fin_year()
    {
      this.show = !this.show;
    }
  }
