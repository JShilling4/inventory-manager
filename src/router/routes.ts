import Home from "@/views/HomeView.vue";
import { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Wizard",
    component: Home,
  },
  {
    path: "/page2",
    name: "PageTwo",
    component: () => import("@/views/PageTwo.vue"),
  },
  {
    path: "/page3",
    name: "PageThree",
    component: () => import("@/views/PageThree.vue"),
  },
];
