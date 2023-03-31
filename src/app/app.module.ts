import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TableModule } from 'ngx-easy-table';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NgEasyValidationModule } from 'ng-easy-validation';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { BnNgIdleService } from 'bn-ng-idle';

import {MatFormFieldModule} from '@angular/material/form-field';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule , MAT_DATE_LOCALE} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';


import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dash/dash';
import { HomeComponent } from './pages/home/home';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { Customer_Component  } from './components/customer-vendor/add-customer/main';
import { Vendor_Component } from './components/customer-vendor/add-vendor/main';
import { Add_productComponent } from './components/products/add/main';
import { Update_productComponent } from './components/products/update/main';
import { Main_page_Component } from './pages/new/main-page/main-page';
import { Invoice_Component } from './pages/new/invoice/invoice';
import { Purchase_Component } from './pages/new/purchase/purchase';
import { PurchaseheadComponent } from './components/heads/purchase_head/main';
import { SettingsComponent } from './components/settings/main/main';
import { Change_passwordComponent } from './components/settings/change_password/main';
import { Company_updation_Component } from './components/settings/company_updatation/main';

import { Viewbills_InvoiceComponent } from './pages/view/invoice/invoice';
import { Viewperfoma_InvoiceComponent } from './pages/view/perfoma/perfoma';
import { Main_view_page_Component } from './pages/view/main-page/main';
import  { View_Purchase_return_bills_Component } from './pages/view/purchase-return/main';
import { Purchase_Return_edit_Component } from './pages/update/purchase-return/main';

import { Invoice_update_Component , Pre_reciept_edit_component , Pre_reciept_add_component} from './pages/update/invoice/main';
import { Purchase_update_Component , Pre_pay_edit_component, Pre_pay_add_component } from './pages/update/purchase/main';

import { View_bills_purchase_Component } from './pages/view/purchase/main';

import { Printa5Component_type_1 } from './components/print/a5/type_1/main';
import { Printa5Component_type_2 } from './components/print/a5/type_2/main';

import { Printa4Component_type_1 } from './components/print/a4/type_1/main';
import { Printa4Component_type_2 } from './components/print/a4/type_2/main';
import { Printa4Component_type_3 } from './components/print/a4/type_3/main';
import { Printa4Component_type_4 } from './components/print/a4/type_4/main';
import {  Printa4Component_type_5 } from './components/print/a4/type_5/main';
import {  Printa4Component_type_6 } from './components/print/a4/type_6/main';
import { Printa4Component_type_7 } from './components/print/a4/type_7/main';
import { Printa4Component_type_8 } from './components/print/a4/type_8/main';
import { Printa4Component_type_9 } from './components/print/a4/type_9/main';
import { PrinteightyComponent_type_1 } from './components/print/80mm/type_1/main';
import { PrinteightyComponent_type_2 } from './components/print/80mm/type_2/main';
import { Print_debit_voucher_type_1 } from './components/print/debit_voucher/main';
import { Print_credit_voucher_type_1 } from './components/print/credit_voucher/type_1/main';


import { Report_main_Component } from './pages/Reports/main/main';
import { Report_Sales_Component } from './pages/Reports/Sales/main';
import { Gst_report_main_Component } from './pages/Reports/Gst/main/main';
import { Report_Stocks_main_Component } from './pages/Reports/Stock/main/main';
import { Gst_report_detailed_Component  } from './pages/Reports/Gst/detailed/main';

import { Summary_main_Component } from './pages/summary/main/main';
import { Summary_gst_main } from './pages/summary/gst/main/main';

import { Summary_sales_main } from './pages/summary/sales/main/main';
import { Summary_b2bs_colum } from './pages/summary/gst/gst_r1/b2bs/main';
import { Summary_b2c_small } from './pages/summary/gst/gst_r1/b2cs/main';
import { Summary_gst_hsn_wise_sales } from './pages/summary/gst/gst_r1/hsn/main';
import { Summary_gst_hsn_wise_sales_b2c } from './pages/summary/gst/gst_r1/hsn_b2c/main';
import { Summary_gst_hsn_wise_sales_b2b } from './pages/summary/gst/gst_r1/hsn_b2b/main';

import { Summary_sales_daily_stock } from './pages/summary/sales/daily_sales_stock/main';
import { Summary_sales_period_stock } from './pages/summary/sales/period_sales_stock/main';
import { Summary_sales_daily_cash } from './pages/summary/sales/daily_sales_cash/main';


import { Purchase_Return_Component } from './pages/new/purchase-return/main';
import { Print_pur_ret_a4_Component_type_1 } from './components/print/purchase-return-a4/main';

import { Report_product_list_Component } from './pages/Reports/Others/product_list/main';




  import { TestComponent } from './pages/test/main';
 

import { AppService } from './services/app.service';
import { ApiService } from './services/api.service';
import { Service_worker } from './services/sw.service';
import { DataService } from './services/data.service';
import { HttpErrorHandler } from './services/error-handler';
import { MessageService } from './services/message';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { SmallLoaderComponent } from './components/small-loader/main';
import { Sales_return_Component } from './pages/new/Sales-return/main';
import { Report_Sales_to_customerComponent } from './pages/summary/sales/sales_to_customer/main';
import { PrinteightyComponent_type_3 } from './components/print/80mm/type_3/main';
import { Reprint_component } from './components/Reprint/main';
import { Summary_stocks_main } from './pages/summary/stock/main/main';
import { Summary_stocks_current_date } from './pages/summary/stock/current_date/main';
import { Change_fy_Component } from './components/settings/change_fy/main';



@NgModule({
  declarations: [
    AppComponent,LoginComponent,DashboardComponent,HomeComponent,SidebarComponent,FooterComponent,NavbarComponent,
    Customer_Component,Vendor_Component,Add_productComponent,Update_productComponent,Main_page_Component,Invoice_Component,
    Purchase_Component,PurchaseheadComponent,Printa5Component_type_1,Printa5Component_type_2,Printa4Component_type_1,SettingsComponent,Printa4Component_type_2,
    Company_updation_Component,Viewbills_InvoiceComponent,Main_view_page_Component,Invoice_update_Component,Purchase_update_Component,Viewperfoma_InvoiceComponent,
    Report_main_Component,Report_Sales_Component,Gst_report_main_Component,View_bills_purchase_Component,Printa4Component_type_3,
    View_Purchase_return_bills_Component,Purchase_Return_edit_Component,Printa4Component_type_7,Pre_reciept_add_component,
    TestComponent,Printa4Component_type_4,Purchase_Return_Component,Print_pur_ret_a4_Component_type_1,Printa4Component_type_9,
    Printa4Component_type_5,Printa4Component_type_6,Report_Stocks_main_Component,Printa4Component_type_8,Report_product_list_Component,
    Pre_reciept_edit_component,Pre_pay_edit_component,Print_debit_voucher_type_1,Pre_pay_add_component,Change_passwordComponent,
    Gst_report_detailed_Component,Print_credit_voucher_type_1,PrinteightyComponent_type_1,PrinteightyComponent_type_2,Summary_main_Component,
    Summary_sales_period_stock,SmallLoaderComponent,Sales_return_Component,Report_Sales_to_customerComponent,Change_fy_Component,
    Summary_b2bs_colum,Summary_gst_main,Summary_b2c_small,Summary_sales_main,Summary_sales_daily_stock,Summary_sales_daily_cash,Summary_gst_hsn_wise_sales,
    PrinteightyComponent_type_3,Reprint_component,Summary_gst_hsn_wise_sales_b2c,Summary_gst_hsn_wise_sales_b2b,Summary_stocks_main,Summary_stocks_current_date 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule,NguiAutoCompleteModule,
    HttpClientModule,MatFormFieldModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    TableModule,AngularMyDatePickerModule,        
    NgxPermissionsModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    KeyboardShortcutsModule.forRoot(),
    NgEasyValidationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AppService,ApiService,DataService,HttpErrorHandler,BnNgIdleService,MessageService,Service_worker,CurrencyPipe,DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' } ],
  bootstrap: [AppComponent],
  schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
