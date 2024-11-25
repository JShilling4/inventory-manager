import { Tables } from "./supabase";

export type Customer = Tables<"customer">;
export interface NewCustomer extends Omit<Tables<"customer">, "id"> {
  id?: number;
}
