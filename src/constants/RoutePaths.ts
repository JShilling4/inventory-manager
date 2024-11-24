import { RouteNameKey } from "@/constants";

export const ROUTE_PATHS: Record<RouteNameKey, string> = {
  Home: "/",
  Products: "/products",
  Categories: "/categories",
  Orders: "/orders",
  Customers: "/customers",
} as const;

export type RoutePathKey = keyof typeof ROUTE_PATHS;

export type RoutePath = (typeof ROUTE_PATHS)[RoutePathKey];
