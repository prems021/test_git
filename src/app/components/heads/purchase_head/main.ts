
import { Component, OnInit,ViewChild,ChangeDetectorRef,Renderer2 } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ApiService } from '../../../services/api.service';
import {AngularMyDatePickerDirective, DefaultView, IAngularMyDpOptions,IMyInputFieldChanged, 
   IMyDateModel, IMyMarkedDate, CalAnimation} from  'angular-mydatepicker';

@Component({
  selector: 'app-purchase-head',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class PurchaseheadComponent implements OnInit {
  

  cus_vend_model : any = null;
  CUS_MODEL : any = 'Cash';
  modal : any;
  modal_2 : any;
  arrayOfVendors : any [] = [];

  public myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    markCurrentDay: true,
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    minYear: 2019,
    maxYear: 2200,
    showSelectorArrow: true,
    monthSelector: true,
    yearSelector: true,
    satHighlight: false,
    highlightDates: [],
    disableDates: [],
    disableHeaderButtons: true,
    showWeekNumbers: false,
    disableDateRanges: [
      {begin: {year: 2016, month: 10, day: 5}, end: {year: 2016, month: 10, day: 7}},
      {begin: {year: 2016, month: 10, day: 10}, end: {year: 2016, month: 10, day: 12}}
    ],
    disableUntil: {year: 0, month: 0, day: 0},
    disableSince: {year: 2022, month: 2, day: 2},
    disableWeekdays: [],
    markDates: [],
    markWeekends: <IMyMarkedDate>{},
    selectorHeight: '200px',
    selectorWidth: '220px',
    closeSelectorOnDateSelect: true,
    closeSelectorOnDocumentClick: true,
    showMonthNumber: true,
    appendSelectorToBody: false,
    focusInputOnDateSelect: true,
    dateRangeDatesDelimiter: " - ",
    defaultView: DefaultView.Date,
    showFooterToday: false,
    calendarAnimation: {in: CalAnimation.ScaleCenter, out: CalAnimation.Fade},
    rtl: false,
    stylesData:
      {
        selector: '',
        styles: ''
      }
  };

  public selectedDate: any;
  public disabled: boolean = true;
  public entry_id : number = 2;
  public model_date: IMyDateModel = null; 
  public inputText: string = "";
  public validDate: boolean = false;
 


  @ViewChild('dp') ngxdp: AngularMyDatePickerDirective;

    

  public selectorSizes: Array<string> = new Array('266px x 266px', '200px x 220px', '260px x 290px');
  public defaultViews: Array<string> = new Array('date', 'month', 'year');
  public calAnimations: Array<string> = new Array('None', 'Fade', 'ScaleTop-ScaleCenter', 'ScaleCenter-ScaleTop', 'Rotate', 'FlipDiagonal');
  public styleColor: Array<string> = new Array('Default', 'Grey', 'Blue', 'Green', 'Red', 'Yellow', 'Dark');

  public locale: string = 'en';
  

  

  constructor(public ds : DataService ,private cdr: ChangeDetectorRef,public api : ApiService,private renderer: Renderer2 ) {

    
   }  
 

 

  ngOnInit(): void {

    this.modal = document.getElementById("myModal");
    this.modal_2 = document.getElementById("myModal_2");
    this.model_date = {isRange: false, singleDate: {jsDate: new Date()}};
    this.ds.i_m.heads.INVOICE_DATE = new Date();

    this.get_vendors();
   
  
  }

   get_vendors()
   { 
   

     this.api.cus_vendor_list_filter_vendor_only()
     .subscribe((jsonData) => { this.get_vendor_res(jsonData)
                         },(err) => console.error(err),
                         
                         );
   }

  get_vendor_res(json:any)
  {
    console.log('res..',json);
     this.arrayOfVendors  = json;
   // this.arrayOfVendors = json.filter(xxy=>xxy.MODE_ == 3 || xxy.MODE_ == 4)
   // console.log('result',this.arrayOfVendors);
  }

  change_vendor_name(ev:any)
  {
    console.log('in',ev);
    if(ev.ID > 0)
    {
        this.ds.i_m.heads.CUS_ID = ev.ID
       
    }
    else
    {
        this.ds.i_m.heads.CUS_NAME = ev;
        this.ds.i_m.heads.CUS_ID = 0;
        alert('incorrect selection')
    }
    
//     let bi : any;
 
//   bi = this.arrayOfVendors.filter(xi=> xi.ID  == v_n);
 
//   console.log('rlt',bi);
 
//       if(bi.length == 1)
//       {
//         this.ds.i_m.heads.CUS_NAME = bi[0].NAME;
//         this.ds.i_m.heads.CUS_ADDRESS = bi[0].STREET;
//         this.ds.i_m.heads.CUS_ID = bi[0].ID;
        


//       }

//       else
//       {
//         this.ds.i_m.heads.CUS_NAME = v_n;
//         this.ds.i_m.heads.CUS_ID = 0;
//       }
 
  }

  customCallback(ev:any)
  {
    console.log('ev',ev)
    alert('incorrect selection')
  }

  open_modal()
  {
    
    this.modal.style.display = "block";
  }
  close_modal()
 {
  this.modal.style.display = "none";
 }

 update_close_modal()
 {
   this.modal.style.display = "none";
 }

 open_modal_bill_dets()
 {   
   this.modal_2.style.display = "block";
 }
  


  focus_cus()
{
  this.entry_id = 2;
  
}



  
  clearDate(): void {
    this.ngxdp.clearDate();
  }

  setDate(): void {
    // Initialize single date (today)
    if (this.myDatePickerOptions.dateRange) {
      alert("Date range mode is enabled! Change mode to single date before set single date.");
      return;
    }

    this.model_date = {isRange: false, singleDate: {jsDate: new Date()}};
  }






  onDisableToday(checked: boolean): void {
    let d: Date = new Date();
    let copy = this.getCopyOfOptions();
    copy.disableDates = checked ? [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}] : [];
    this.myDatePickerOptions = copy;
  }

  onMarkToday(checked: boolean): void {
    let d: Date = new Date();
    let copy = this.getCopyOfOptions();
    copy.markDates = checked ? [{
      dates: [{year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()}],
      color: '#C30000'
    }] : [];
    this.myDatePickerOptions = copy;
  }








  onFocusInputOnDateSelect(checked: boolean): void {
    let copy = this.getCopyOfOptions();
    copy.focusInputOnDateSelect = checked;
    this.myDatePickerOptions = copy;
  }




  onShowFooterBar(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.showFooterToday = checked;
    this.myDatePickerOptions = copy;
  }

 




  onDisableInput(checked: boolean) {
    this.disabled = checked;
  }




  


  getCopyOfOptions(): IAngularMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }

  
  // callbacks
  onDateChanged(event: IMyDateModel): void {
   console.log('onDateChanged(): ', event);
   this.ds.i_m.heads.INVOICE_DATE = event.singleDate.jsDate;
   console.log('onDate',this.ds.i_m.heads.INVOICE_DATE);
 
    }
    onInputFieldChanged(event: IMyInputFieldChanged): void {
    //  console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
      this.validDate = event.valid;
      this.inputText = event.value;
    }
  


 
  
 //   this.ds.i_m.heads.INVOICE_DATE = this.model_2.singleDate.jsDate;
  


}

