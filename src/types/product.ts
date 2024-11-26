import { ProductStatus } from "@/constants";
import { Tables } from "./supabase";

export interface Product extends Omit<Tables<"product">, "id"> {
  id?: number;
}

export function NewProduct(
  name: string | null = null,
  description: string | null = null,
  price: number | null = null,
  quantity: number | null = null,
  status: ProductStatus | null = "Active",
  category_id: number | null = null,
  sku: string | null = null
): Product {
  return {
    name,
    description,
    price,
    quantity,
    status,
    category_id,
    sku,
  };
}
