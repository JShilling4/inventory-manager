<script setup lang="ts">
import { computed } from "vue";
import { AppDialog } from "@/components/layout";
import { FormInput } from "@/components/ui";
import { useCategoryStore } from "@/stores";
import { type Category } from "@/types";

const categoryStore = useCategoryStore();

const showModal = defineModel<boolean>("showModal");
const modalAction = computed(() => {
  return category.value.id ? "Edit" : "Add";
});
function onCancelAction() {
  showModal.value = false;
}

const category = defineModel<Category>("category", { required: true });
async function onSaveCategory() {
  if (!category.value) return;
  if (category.value.id) {
    await categoryStore.updateCategory(category.value);
  } else {
    await categoryStore.createCategory(category.value);
  }
}
</script>

<template>
  <AppDialog
    v-model="showModal"
    persistent
    @confirm="onSaveCategory"
    @cancel="onCancelAction"
  >
    <template #heading>
      <h6>{{ modalAction }} Category</h6>
    </template>
    <template v-if="category" #body>
      <div class="row">
        <FormInput v-model="category.name" label="Name" class="col" />
      </div>
      <div class="row">
        <FormInput
          v-model="category.description"
          label="Description"
          class="col"
        />
      </div>
    </template>
  </AppDialog>
</template>

<style lang="scss" scoped>
.modal-content {
  width: 100%;
}
.modal-body {
  padding: 0 1.5rem 2rem;
}
</style>
