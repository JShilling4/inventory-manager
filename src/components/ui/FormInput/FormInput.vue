<script setup lang="ts">
const modelValue = defineModel<number | string | null>("modelValue", {
  required: true,
});
</script>

<template>
  <QInput v-model="modelValue" />
</template>

<style lang="scss" scoped></style>
