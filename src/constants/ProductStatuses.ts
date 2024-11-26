export const PRODUCT_STATUSES = [
  "Active",
  "Back Ordered",
  "Discontinued",
] as const;
type ProductStatuses = typeof PRODUCT_STATUSES;
export type ProductStatus = ProductStatuses[number];
