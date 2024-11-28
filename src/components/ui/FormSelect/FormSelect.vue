<template>
  <QSelect v-model="model" behavior="menu" class="app-select col" />
</template>

<script setup lang="ts">
const model = defineModel<unknown>({ required: true });
</script>

<style lang="scss" scoped></style>
