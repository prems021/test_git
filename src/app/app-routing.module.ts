import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dash/dash';
import { HomeComponent } from './pages/home/home';
import { Main_page_Component } from './pages/new/main-page/main-page';
import { Invoice_Component } from './pages/new/invoice/invoice';
import { Purchase_Component } from './pages/new/purchase/purchase';
import { SettingsComponent } from './components/settings/main/main';
import { Change_passwordComponent } from './components/settings/change_password/main';
import { Company_updation_Component } from './components/settings/company_updatation/main';

import { Main_view_page_Component } from './pages/view/main-page/main';
import { Viewbills_InvoiceComponent } from './pages/view/invoice/invoice';
import { Viewperfoma_InvoiceComponent } from './pages/view/perfoma/perfoma';
import  { View_Purchase_return_bills_Component } from './pages/view/purchase-return/main';


import { Invoice_update_Component } from './pages/update/invoice/main';

import { Report_main_Component } from './pages/Reports/main/main';
import { Report_Sales_Component } from './pages/Reports/Sales/main';
import { Gst_report_main_Component } from './pages/Reports/Gst/main/main';
import { Report_Stocks_main_Component } from './pages/Reports/Stock/main/main';
import { Gst_report_detailed_Component  } from './pages/Reports/Gst/detailed/main';

import { Summary_main_Component } from './pages/summary/main/main';
import { Summary_gst_main } from './pages/summary/gst/main/main';
import { Summary_sales_main } from './pages/summary/sales/main/main';
import { Summary_sales_daily_stock } from './pages/summary/sales/daily_sales_stock/main';
import { Summary_sales_daily_cash } from './pages/summary/sales/daily_sales_cash/main';
import { Summary_sales_period_stock } from './pages/summary/sales/period_sales_stock/main';
import { Summary_b2bs_colum } from './pages/summary/gst/gst_r1/b2bs/main';
import { Summary_b2c_small } from './pages/summary/gst/gst_r1/b2cs/main';
import { Summary_gst_hsn_wise_sales } from './pages/summary/gst/gst_r1/hsn/main';

import { View_bills_purchase_Component } from './pages/view/purchase/main';
import { Purchase_update_Component } from './pages/update/purchase/main';
import { Report_product_list_Component } from './pages/Reports/Others/product_list/main';



import { Purchase_Return_Component } from './pages/new/purchase-return/main';
import { Purchase_Return_edit_Component } from './pages/update/purchase-return/main';

import { Sales_return_Component } from './pages/new/Sales-return/main';

import { Report_Sales_to_customerComponent } from './pages/summary/sales/sales_to_customer/main';

import { TestComponent } from './pages/test/main';
import { Reprint_component } from './components/Reprint/main';
import { Summary_gst_hsn_wise_sales_b2c } from './pages/summary/gst/gst_r1/hsn_b2c/main';
import { Summary_gst_hsn_wise_sales_b2b } from './pages/summary/gst/gst_r1/hsn_b2b/main';
import { Summary_stocks_main } from './pages/summary/stock/main/main';
import { Summary_stocks_current_date } from './pages/summary/stock/current_date/main';

const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent}, 
  {path: 'reprint/:uid', component: Reprint_component  },
  {path: 'home', component: HomeComponent,  
  children: [
      {path: '',   redirectTo: 'home/dash', pathMatch: 'full'},
      {path: 'dash',component: DashboardComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      {path: 'new',component: Main_page_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      {path: 'new-invoice',component: Invoice_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  },

      {path: 'new-sales-return',component: Sales_return_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  },

      

      {path: 'new-purchase',component: Purchase_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } } },
      {path: 'settings',component: SettingsComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin','CounterStaff'] } } },
      {path: 'view',component: Main_view_page_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      {path: 'view-invoice',component: Viewbills_InvoiceComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      {path: 'view-perfoma',component: Viewperfoma_InvoiceComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      
      {path: 'view-purchase',component: View_bills_purchase_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
     
      {path: 'view-purchase-return',component: View_Purchase_return_bills_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,

      {path: 'change-password',component: Change_passwordComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      
      {path: 'new-purchase-return',component: Purchase_Return_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      {path: 'update-invoice',component: Invoice_update_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      {path: 'update-purchase',component: Purchase_update_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      {path: 'update-purchase-return',component: Purchase_Return_edit_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['CounterStaff', 'Admin'] } }  } ,
      {path: 'update-company-dets',component: Company_updation_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },

      {path: 'report-main',component: Summary_main_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },

      {path: 'report-sales',component: Report_Sales_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      {path: 'report-sales-day-stock',component: Summary_sales_daily_stock, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      {path: 'report-sales-period-stock',component: Summary_sales_period_stock, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      {path: 'report-sales-day-cash',component: Summary_sales_daily_cash, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      {path: 'report-sales-to-customer',component: Report_Sales_to_customerComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      


      {path: 'report-product-list',component: Report_product_list_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      
      {path: 'report-stocks',component: Report_Stocks_main_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      {path: 'report-gst-main',component: Summary_gst_main, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } }, 
      {path: 'report-stock-main',component: Summary_stocks_main, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } }, 
      {path: 'report-sales-main',component: Summary_sales_main, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },   
      {path: 'report-gst-b2bs-colum',component: Summary_b2bs_colum, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },     
      {path: 'report-gst-b2c-small',component: Summary_b2c_small, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } }, 
      {path: 'report-gst-hsn-wise-sales',component: Summary_gst_hsn_wise_sales, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      {path: 'report-gst-hsn-wise-sales-b2b',component: Summary_gst_hsn_wise_sales_b2b, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      {path: 'report-gst-hsn-wise-sales-b2c',component: Summary_gst_hsn_wise_sales_b2c, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      {path: 'report-stock-on-date',component: Summary_stocks_current_date, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      
      
      {path: 'test',component: TestComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
      
      
      ],
    canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
  }
   },  
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



