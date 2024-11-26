<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CategoryModal } from "@/views";
import { PageHeading, PageContentContainer } from "@/components/layout";
import { AppButton, AppIcon } from "@/components/ui";
import { useCategoryStore } from "@/stores";
import clone from "lodash/clone";
import { ICON_NAMES } from "@/constants";
import { type Category, NewCategory } from "@/types";

const categoryStore = useCategoryStore();

const showModal = ref(false);
const modalAction = ref<"Add" | "Edit">("Add");
const localCategory = ref<Category>(NewCategory());

function onAddCategoryClick() {
  modalAction.value = "Add";
  showModal.value = true;
}

function onEditCategoryClick(_event: Event, row: Category) {
  if (!row.id) return;
  localCategory.value =
    clone(categoryStore.getCategoryById(row.id)) ?? NewCategory();
  modalAction.value = "Edit";
  showModal.value = true;
}

// function onDeleteCategoryClick(id: number) {
//   customerStore.deleteSong(id);
// }

function onHideModal() {
  localCategory.value = NewCategory();
}

onMounted(async () => {
  await categoryStore.fetchCategories();
});
</script>

<template>
  <PageHeading>Categories</PageHeading>
  <PageContentContainer>
    <AppButton @click="onAddCategoryClick">
      <AppIcon :name="ICON_NAMES.Plus" /> Add Category
    </AppButton>
    <QTable
      :rows="categoryStore.categories"
      class="customer-table mt-sm"
      :loading="categoryStore.loading"
      @row-click="onEditCategoryClick"
    >
      <template #loading>
        <QInnerLoading showing color="primary" />
      </template>
    </QTable>
  </PageContentContainer>
  <CategoryModal
    v-model:show-modal="showModal"
    v-model:category="localCategory"
    :action="modalAction"
    @hide="onHideModal"
  />
</template>

<style lang="scss" scoped>
:deep(thead tr:first-child th) {
  background-color: var(--primary-bg-color);
  color: var(--primary-text-color);
}
</style>
