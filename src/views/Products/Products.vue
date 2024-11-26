<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ProductModal } from "@/views";
import { PageHeading, PageContentContainer } from "@/components/layout";
import { AppButton, AppIcon } from "@/components/ui";
import { useCategoryStore, useProductStore } from "@/stores";
import clone from "lodash/clone";
import { ICON_NAMES } from "@/constants";
import { type Product, NewProduct } from "@/types";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const showModal = ref(false);
const modalAction = ref<"Add" | "Edit">("Add");
const localProduct = ref<Product>(NewProduct());

function onAddProductClick() {
  modalAction.value = "Add";
  showModal.value = true;
}

function onEditProductClick(_event: Event, row: Product) {
  if (!row.id) return;
  localProduct.value =
    clone(productStore.getProductById(row.id)) ?? NewProduct();
  modalAction.value = "Edit";
  showModal.value = true;
}

// function onDeleteProductClick(id: number) {
//   customerStore.deleteSong(id);
// }

function onHideModal() {
  localProduct.value = NewProduct();
}

onMounted(async () => {
  await productStore.fetchProducts();
  categoryStore.fetchCategories();
});
</script>

<template>
  <PageHeading>Products</PageHeading>
  <PageContentContainer>
    <AppButton @click="onAddProductClick">
      <AppIcon :name="ICON_NAMES.Plus" /> Add Product
    </AppButton>
    <QTable
      :rows="productStore.products"
      class="customer-table mt-sm"
      :loading="productStore.loading"
      @row-click="onEditProductClick"
    >
      <template #loading>
        <QInnerLoading showing color="primary" />
      </template>
    </QTable>
  </PageContentContainer>
  <ProductModal
    v-model:show-modal="showModal"
    v-model:product="localProduct"
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
