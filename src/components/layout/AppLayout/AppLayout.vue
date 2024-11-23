<script setup lang="ts">
import { inject } from "vue";
import { AppDrawer, SideNav, AppHeader } from "@/components/layout";
import { layoutKey } from "@/utils/symbols";
import { type ILayout } from "@/composables";

const $layout = inject<ILayout>(layoutKey) as ILayout;
</script>

<template>
  <div class="app-layout">
    <AppHeader class="bg-primary text-white" />
    <AppDrawer v-model="$layout.leftDrawer.isVisible" class="bg-black">
      <SideNav />
    </AppDrawer>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  position: relative;
  width: 100%;
  min-height: 100%;
}
</style>
