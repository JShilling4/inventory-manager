<script setup lang="ts">
import { AppIcon } from "@/components/ui";
import { ILayout } from "@/composables";
import { ICON_NAMES } from "@/constants";
import { layoutKey } from "@/utils/symbols";
import { inject, watch } from "vue";

const { height = "5rem" } = defineProps<{ height?: string }>();

const $layout = inject<ILayout>(layoutKey) as ILayout;

watch(
  () => height,
  (newValue) => {
    $layout.header.height = newValue;
  },
  { immediate: true }
);

function toggleLeftDrawer() {
  $layout.leftDrawer.isVisible = !$layout.leftDrawer.isVisible;
}
</script>

<template>
  <header class="app-header">
    <div class="fit flex items-center px-sm">
      <AppIcon
        v-if="!$layout.leftDrawer.isFixed"
        :name="ICON_NAMES.Menu"
        color="#fff"
        size="2x"
        class="left-drawer-toggle"
        @click="toggleLeftDrawer"
      />
      <div class="app-title ml-sm text-white">Inventory Manager</div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: v-bind(height);
  z-index: 2000;
}
.app-title {
  font-weight: 400;
  font-size: 24px;
}
</style>
