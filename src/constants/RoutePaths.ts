export const ROUTE_PATHS = {
  Home: "/",
  PageTwo: "/page2",
  PageThree: "/page3",
} as const;

type RoutePathKey = keyof typeof ROUTE_PATHS;

export type RoutePath = (typeof ROUTE_PATHS)[RoutePathKey];
