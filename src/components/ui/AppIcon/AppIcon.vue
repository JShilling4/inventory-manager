<script setup lang="ts">
import { type IconName } from "@/constants";

const { name, color = "#000" } = defineProps<{
  name: IconName;
  color?: string;
}>();
</script>

<template>
  <FontAwesomeIcon :icon="name" class="icon" :color size="lg" />
</template>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
}
</style>
