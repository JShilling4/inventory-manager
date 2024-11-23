export const ICON_NAMES = {
  Home: "",
  Menu: "fas fa-bars",
  Close: "fas fa-close",
  Route: "",
  Settings: "fas fa-cog",
  Dashboard: "fas fa-grip",
  Boxes: "fas fa-boxes-stacked",
  Order: "fas fa-money-check-dollar",
  List: "fas fa-list",
} as const;

type IconNameKey = keyof typeof ICON_NAMES;

export type IconName = (typeof ICON_NAMES)[IconNameKey];
