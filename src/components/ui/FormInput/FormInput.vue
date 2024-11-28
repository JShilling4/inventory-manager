<script setup lang="ts">
const modelValue = defineModel<string | null>("modelValue", { required: true });
</script>

<template>
  <QInput v-model="modelValue" />
</template>

<style lang="scss" scoped></style>
