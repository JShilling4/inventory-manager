<script setup lang="ts">
import { computed, inject } from "vue";
import { ILayout } from "@/composables";
import { layoutKey } from "@/utils/symbols";

const { vPad = "1.5rem", hPad = "1.5rem" } = defineProps<{
  vPad?: string;
  hPad?: string;
}>();

const $layout = inject<ILayout>(layoutKey) as ILayout;

const windowWidth = computed(() => window.innerWidth);
</script>

<template>
  <main class="view-container">
    <slot></slot>
  </main>
</template>

<style lang="scss" scoped>
.view-container {
  position: absolute;
  top: v-bind("$layout.header.height");
  left: v-bind("`${$layout.leftDrawer.width}rem`");
  width: calc(v-bind("`${windowWidth}px - ${$layout.leftDrawer.width}rem`"));
  padding-top: v-bind(vPad);
  padding-bottom: v-bind(vPad);
  padding-left: v-bind(hPad);
  padding-right: v-bind(hPad);
  transition: left 0.3s ease-in-out;
}
</style>
