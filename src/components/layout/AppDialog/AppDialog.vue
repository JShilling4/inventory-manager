<script setup lang="ts">
const showDialog = defineModel<boolean>("showModal");
</script>

<template>
  <QDialog v-model="showDialog">
    <slot></slot>
  </QDialog>
</template>

<style lang="scss" scoped></style>
