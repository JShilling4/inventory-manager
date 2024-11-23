<script setup lang="ts">
import { SideNavItem } from "@/components/layout";
import { ICON_NAMES, ROUTE_PATHS } from "@/constants";
</script>

<template>
  <nav class="nav-list pa-xs">
    <SideNavItem :icon="ICON_NAMES.Dashboard" :path="ROUTE_PATHS.Home">
      Dashboard
    </SideNavItem>
    <SideNavItem :icon="ICON_NAMES.Boxes" :path="ROUTE_PATHS.Products">
      Products
    </SideNavItem>
    <SideNavItem :icon="ICON_NAMES.Order" :path="ROUTE_PATHS.Orders">
      Orders
    </SideNavItem>
    <SideNavItem :icon="ICON_NAMES.List" :path="ROUTE_PATHS.Categories">
      Categories
    </SideNavItem>
  </nav>
</template>

<style lang="scss" scoped></style>
