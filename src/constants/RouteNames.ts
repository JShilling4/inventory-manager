export const ROUTE_NAMES = {
  Home: "/",
  Products: "/products",
  Categories: "/categories",
  Orders: "/orders",
} as const;

export type RouteNameKey = keyof typeof ROUTE_NAMES;

export type RouteName = (typeof ROUTE_NAMES)[RouteNameKey];
