export const ROUTE_NAMES = {
  Home: "Home",
  Products: "Products",
  Categories: "Categories",
  Orders: "Orders",
  Customers: "Customers",
} as const;

export type RouteNameKey = keyof typeof ROUTE_NAMES;

export type RouteName = (typeof ROUTE_NAMES)[RouteNameKey];
