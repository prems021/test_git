import { Component, OnDestroy, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';



import { ApiService } from '../../services/api.service';
import { AppService } from '../../services/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit,OnDestroy {

  submitted = false;
 

  constructor(
    public appService : AppService,private bnIdle: BnNgIdleService,public api: ApiService,public ps :NgxPermissionsService,public rs : Router) {  }

  ngOnInit(): void {

    this.bnIdle.startWatching(900).subscribe((res: boolean) => {
      if (res) {
        this.bnIdle.stopTimer(); 
        this.rs.navigate(['/login']);
        this.ps.flushPermissions();       
        localStorage.removeItem('token');
        alert('session expired');
        

      }
    });
 

  }
  ngOnDestroy() {
    console.log('ngOnDestroy: cleaning up...');
    this.bnIdle.stopTimer(); 
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
    }
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

}
