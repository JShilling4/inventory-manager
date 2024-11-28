<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QTableProps } from "quasar";
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

const categoryTableColumns: QTableProps["columns"] = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row: Category) => row.name,
    sortable: true,
  },
  {
    name: "description",
    required: true,
    label: "Description",
    align: "left",
    field: (row: Category) => row.description,
    sortable: false,
  },
  {
    name: "delete",
    label: "",
    align: "center",
    field: "",
    sortable: false,
  },
];

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

function onDeleteCategoryClick(row: Category) {
  if (!row.id) return;
  categoryStore.deleteCategory(row.id);
}

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
      :columns="categoryTableColumns"
      class="customer-table mt-sm"
      :loading="categoryStore.loading"
      @row-click="onEditCategoryClick"
    >
      <template #loading>
        <QInnerLoading showing color="primary" />
      </template>

      <template #body-cell-delete="props">
        <QTd :props="props" auto-width>
          <AppButton
            :icon="ICON_NAMES.Delete"
            color="red-7"
            size="sm"
            rounded
            @click.stop="onDeleteCategoryClick(props.row)"
          />
        </QTd>
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
