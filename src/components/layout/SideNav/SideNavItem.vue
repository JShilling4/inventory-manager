<script setup lang="ts">
import { AppIcon } from "@/components/ui";
import { IconName, RoutePath } from "@/constants";
import { RouterLink } from "vue-router";

const { icon = "", path } = defineProps<{
  icon?: IconName;
  path: RoutePath;
}>();
</script>

<template>
  <RouterLink :to="path" class="nav-item px-xs py-xs">
    <AppIcon :name="icon" class="nav-icon fa-fw" />
    <div class="nav-item-label ml-xs">
      <slot></slot>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.nav-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #fff;
  border-radius: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    .nav-item-label {
      font-weight: 400;
    }
  }
}
.nav-icon {
  color: #fff;
}
.nav-item-label {
  font-weight: 300;
}
</style>
