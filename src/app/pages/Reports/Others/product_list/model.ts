export interface Hb7product {
    id: number;
    com_id: number;
    batch_id: string;
    bar_code: string;
    hsn_code: string;
    product_name: string;
    product_description: string;
    category_id: number;
    tax_rate: number;
    mrp: number;
    rate: number;
    unit_id: number;
    opening_stock: number;
    createdAt: string;
    updatedAt: string;
    hb7_unit: Hb7unit;   
  }
  export interface Hb7unit {
    Quantity: string;
    Quantity_Type: string;
    UQC_Code: string;
    id: number;
  }










