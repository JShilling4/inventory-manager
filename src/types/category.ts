import { Tables } from "./supabase";

export interface Category extends Omit<Tables<"category">, "id"> {
  id?: number;
}

export function NewCategory(
  name: string | null = null,
  description: string | null = null
): Category {
  return {
    name,
    description,
  };
}
