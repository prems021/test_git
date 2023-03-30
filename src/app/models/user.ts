

export interface User 
{
com_id : number
id : number,
is_demo_user: boolean,
user_role : string,
hb7_company_detail : company_dets,
msg_to_display: string,
next_expiry: string,
user_name: string,
user_password: string
}

export interface company_dets 
{
 company_address_1: string,
 company_address_2: string,
 company_email: string,
 company_gstin: string,
 company_name: string,
 company_ph_1: string,
 company_ph_2: string,
 company_street: string,
 createdAt: string,
 id: number,
 updatedAt: string
}
