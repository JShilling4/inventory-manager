<script setup lang="ts"></script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  border-radius: 5px;
  padding: 1rem 2rem;
  outline: none;
  cursor: pointer;
}
</style>
