<script setup lang="ts">
import { computed } from "vue";
import { useCategoryStore } from "@/stores";
import { type Category } from "@/types";

const categoryStore = useCategoryStore();

const category = defineModel<Category>("category", { required: true });
const showModal = defineModel<boolean>("showModal");

const modalAction = computed(() => {
  return category.value.id ? "Edit" : "Add";
});

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
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ modalAction }} Category</h6>
      </QCardSection>
      <QCardSection v-if="category" class="modal-body">
        <div class="row">
          <QInput v-model="category.name" label="Name" class="col" />
        </div>
        <div class="row">
          <QInput
            v-model="category.description"
            label="Description"
            class="col"
          />
        </div>
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <QBtn v-close-popup outline label="Cancel" color="black" no-caps />
        <QBtn
          v-close-popup
          label="Save"
          color="green-10"
          no-caps
          @click="onSaveCategory"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<style lang="scss" scoped>
.modal-content {
  width: 100%;
}
.modal-body {
  padding: 0 1.5rem 2rem;
}
</style>
