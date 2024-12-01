<script setup lang="ts">
import { AppButton } from "@/components/ui";

const { cancelLabel = "Cancel", confirmLabel = "Save" } = defineProps<{
  cancelLabel?: string;
  confirmLabel?: string;
}>();

defineEmits<{
  cancel: [];
  confirm: [];
}>();

const showDialog = defineModel<boolean>("showModal");
</script>

<template>
  <QDialog v-model="showDialog">
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <slot name="heading"></slot>
      </QCardSection>
      <QCardSection class="modal-body">
        <slot name="body"></slot>
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <slot name="actions">
          <AppButton
            outline
            :label="cancelLabel"
            color="black"
            @click="$emit('cancel')"
          />
          <AppButton
            :label="confirmLabel"
            color="secondary"
            @click="$emit('confirm')"
          />
        </slot>
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<style lang="scss" scoped>
.modal-body {
  min-width: 400px;
}
</style>
