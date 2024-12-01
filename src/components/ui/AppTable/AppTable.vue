<script setup lang="ts">
import { AppButton } from "@/components/ui";
import { ICON_NAMES } from "@/constants";
import { type QTableProps } from "quasar";

const { rows, columns } = defineProps<{
  rows: QTableProps["rows"];
  columns: QTableProps["columns"];
}>();

defineEmits<{
  delete: [row: any];
}>();
</script>

<template>
  <QTable :rows :columns class="app-table mt-sm">
    <template #loading>
      <QInnerLoading showing color="primary" />
    </template>

    <template #body-cell-delete="props">
      <QTd :props="props" auto-width>
        <AppButton
          :icon="ICON_NAMES.Delete"
          color="red-7"
          fab-mini
          @click.stop="$emit('delete', props.row)"
        />
      </QTd>
    </template>
  </QTable>
</template>

<style lang="scss" scoped></style>
