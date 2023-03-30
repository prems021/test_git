import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import  { SharingService } from '../../../../services/sharing.service';

import { Router } from '@angular/router';
import  { cash_model } from './model'

@Component({
  selector: 'app-payment',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class RecieptComponent implements OnInit {

arrayOfCusValues : any [] = [];
pay_options = ['Cash','Cheque','RTGS/NEFT'];
cheque_flag : boolean = false;
date_change_flag : number = 0;
date_c_change_flag : number = 0;
cash_date : string = '';
Cheque_Date : string = '';
pay_op : string = 'Cash';
cash__model = new cash_model(0,'','',0,'',0,0,'','',null,0,true,false,0,'',false);
print_flag : boolean = false;
reciept_number : number = 0;

isClickedOnce : boolean = false;
onsucc : number = 0;
custoo : any ;
today: number = Date.now();
ser_res : boolean = false
ser_res2 : boolean = false
fig_main : string = '';
fig_model : any = {number_to_convert : 0, msg:'hi'}
selectedOption : string = 'Cash'
     constructor(private router: Router,private ds: DataService, private ss: SharingService) {
    
     
    
  }
  

  ngOnInit() {

  
  
    
   this.get_customers()
  
   this.get_reciept_no()

   this.cash__model.is_reciept = true
  

   
  }






  onChange_option(option)
{
  this.cheque_flag = false;
  this.cash__model.is_cash_pay = true;
  this.cash__model.is_neft = false;


   if(option === 'Cheque')
   {

    this.cheque_flag = true;
    this.cash__model.is_cash_pay = false
    this.cash__model.is_neft = false;
   
   }
   else
   {
     if(option === 'RTGS/NEFT')
     {
       this.cash__model.is_neft = true;
       this.cash__model.is_cash_pay = false
       this.cheque_flag = false;
     }
     else{
     this.cheque_flag = false;
     this.cash__model.is_cash_pay = true
     this.cash__model.is_neft = false;
     }
   }
 }






get_reciept_no()
{

 this.ds.get_reciept_number_b2b().subscribe((jsonData) => { this.getval2(jsonData)  
                      },(err) => console.error(err),
                       
                      );

}

getval2(s:any)
{

 
 
  this.reciept_number = s.count + 1;
  this.ser_res2 = true;
  
}



  get_customers()

{
   this.ds.get_customers_list_b2b()
  .subscribe((jsonData) => { this.get_customer_res(jsonData)
                      },(err) => console.error(err),
                       
                      );
}
get_customer_res(json:any)
{ 
  this.arrayOfCusValues = json;
}

cus_blur(p:any)
{


  let s : any; 

s = this.arrayOfCusValues.filter(xi=> xi.CUSTOMER_NAME === p);

console.log(this.custoo);

if(s.length != 0)
{
  this.cash__model.cus_name = this.custoo.CUSTOMER_NAME;
  this.cash__model.cus_street = this.custoo.STREET;
  this.cash__model.cus_id = this.custoo.ID;


    this.cash__model.due_balance = this.custoo.OPENING_BALANCE
  

}

else
{
	alert('select Proper customer')
// this.ss.invoice_model.cus_name  = p;
}

console.log('dd',this.cash__model.cus_id);

}



  catch_invoice_date(date: any)
 {
    this.date_change_flag = 2
    console.log(date);
    this.cash_date = date._validSelected;
    this.cash__model.cash_date = date._validSelected;
    // this.cash_model.cash_date = this.cash_date;
 }

 catch_chek_date(c_date:any)
 {
   this.date_c_change_flag = 2
      this.Cheque_Date = c_date._validSelected;
     this.cash__model.cheque_Date = this.Cheque_Date;

 }

change_c_date()
{
	this.date_c_change_flag = 0;

}

change_cash_date()
{
	this.date_change_flag = 0;

}
change_two(val:any)
{
  this.cash__model.balance_amt = this.cash__model.due_balance - this.cash__model.amount_payed;
  this.cash__model.balance_amt = Math.round(this.cash__model.balance_amt * 100) / 100;
  this.fig_model.number_to_convert = this.cash__model.amount_payed

  this.ds.get_figure(this.fig_model)
  .subscribe((jsonData) => { this.get_fig_json(jsonData)
                     },(err) => console.error(err),
                      
                     );

}

get_fig_json(json:any)
{
  this.fig_main = json.msg;
}
cash_reciept()
{
	console.log('vvv',this.cash__model)


     if (this.cash__model.amount_payed <= 0)
     {

       alert ('Wrong Amount Payed')
     }

    else if (this.cash__model.is_cash_pay === false && this.cash__model.cheque_Date === '' && this.cash__model.is_neft == false)
    {
    alert ('Enter Cheque Date')
    }
    else
    {
       if(this.cash__model.cash_date == '')
       {
         alert ('Enter Transaction Date')
       }

       else
       {
             this.print_flag = true
             this.isClickedOnce =true;
    
      
      this.cash__model.rec_number = this.reciept_number;
     

      
      this.ds.post_cash_reciept(this.cash__model)
      .subscribe((jsonData) => { this.getval3(jsonData)  
                          },(err) => console.error(err),
                          
                          );

       }

      } 
    

   }
   
  
 
   
 getval3(s:any)
 {
   console.log(s);

   this.print_flag = true
 
    if( s.msg === 'Successfully saved')
    {
      
      this.onsucc = 1;
       alert(s.msg);
       window.print();
       this.router.navigate(['/dash']);

    }
  else
  {
    alert(s.msg);
  }
  
 }




}
