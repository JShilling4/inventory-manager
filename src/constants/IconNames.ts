export const ICON_NAMES = {
  Boxes: "fas fa-boxes-stacked",
  Close: "fas fa-close",
  Customer: "fas fa-people-arrows",
  Dashboard: "fas fa-grip",
  Home: "",
  List: "fas fa-list",
  Menu: "fas fa-bars",
  Order: "fas fa-money-check-dollar",
  Plus: "fas fa-plus",
  Route: "",
  Settings: "fas fa-cog",
} as const;

type IconNameKey = keyof typeof ICON_NAMES;

export type IconName = (typeof ICON_NAMES)[IconNameKey];
