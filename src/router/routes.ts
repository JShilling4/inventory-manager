import Dashboard from "@/views/Dashboard/Dashboard.vue";
import { RouteRecordRaw } from "vue-router";
import { ROUTE_NAMES, ROUTE_PATHS } from "@/constants";

export const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTE_PATHS.Home,
    name: ROUTE_NAMES.Home,
    component: Dashboard,
  },
  {
    path: ROUTE_PATHS.Products,
    name: ROUTE_NAMES.Products,
    component: () => import("@/views/Products/Products.vue"),
  },
  {
    path: ROUTE_PATHS.Categories,
    name: ROUTE_NAMES.Categories,
    component: () => import("@/views/Categories/Categories.vue"),
  },
  {
    path: ROUTE_PATHS.Orders,
    name: ROUTE_NAMES.Orders,
    component: () => import("@/views/Orders/Orders.vue"),
  },
  {
    path: ROUTE_PATHS.Customers,
    name: ROUTE_NAMES.Customers,
    component: () => import("@/views/Customers/Customers.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound/NotFound.vue"),
  },
];
