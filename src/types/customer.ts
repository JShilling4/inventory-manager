import { Tables } from "./supabase";

export interface Customer extends Omit<Tables<"customer">, "id"> {
  id?: number;
}

export function NewCustomer(
  address: string | null = null,
  city: string | null = null,
  state: string | null = null,
  zipcode: string | null = null,
  company: string | null = null,
  first_name: string | null = null,
  last_name: string | null = null,
  email: string | null = null,
  phone: string | null = null
): Customer {
  return {
    address,
    city,
    state,
    zipcode,
    company,
    first_name,
    last_name,
    email,
    phone,
  };
}
