



export interface B2B_items 
{
    GSTIN_UIN_of_Recipient : string,
    Receiver_Name : string,
    Invoice_Number :number ,
    Invoice_date : string,
    Invoice_Value : number,
    Place_Of_Supply : string,
    Reverse_Charge : string,
    Applicable_percentage_of_Tax_Rate : number,
    Invoice_Type : string,
    E_Commerce_GSTIN : string,
    Rate : number,
    Taxable_Value : number,
    Cess_Amount : number,
 
}



export interface B2c_items 
{
    Type : string,
    Place_Of_Supply : string,
    Applicable_percentage_of_Tax_Rate : number,
    Rate : number,
    Taxable_Value : number,
    Cess_Amount : number,
    E_Commerce_GSTIN : string,

   
 
}
export interface Items_hsn 
{

HSN : string,
Description : string,         
UQC : string,   
Total_Quantity : number, 
Total_value : number,
Taxable_value : number,
Integrated_Tax_Amount : number
Central_Tax_Amount : number
State_UT_Tax_Amount : number
Cess_Amount : number
Rate : number

}