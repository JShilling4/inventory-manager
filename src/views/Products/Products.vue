<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ProductModal } from "@/views";
import { PageHeading, PageContentContainer } from "@/components/layout";
import { AppButton, AppTable } from "@/components/ui";
import { useCategoryStore, useProductStore } from "@/stores";
import clone from "lodash/clone";
import { ICON_NAMES } from "@/constants";
import { type Product, NewProduct } from "@/types";
import { type QTableProps } from "quasar";

const categoryStore = useCategoryStore();
const productStore = useProductStore();

const showModal = ref(false);
function onHideModal() {
  localProduct.value = NewProduct();
}

const localProduct = ref<Product>(NewProduct());
const productTableColumns: QTableProps["columns"] = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row: Product) => row.name,
    sortable: true,
  },
  {
    name: "description",
    required: false,
    label: "Description",
    align: "left",
    field: (row: Product) => row.description,
    sortable: false,
  },
  {
    name: "price",
    required: true,
    label: "Price",
    align: "left",
    field: (row: Product) => row.price,
    sortable: false,
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "center",
    field: (row: Product) => row.quantity,
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "Status",
    align: "left",
    field: (row: Product) => row.status,
    sortable: true,
  },
  {
    name: "category",
    required: true,
    label: "Category",
    align: "left",
    field: (row: Product) => row.category_id,
    format: (val) => categoryStore.getCategoryById(val)?.name ?? val,
    sortable: true,
  },
  {
    name: "delete",
    label: "",
    field: "",
    sortable: false,
  },
];
function onAddProductClick() {
  showModal.value = true;
}
function onEditProductClick(_event: Event, row: Product) {
  if (!row.id) return;
  localProduct.value =
    clone(productStore.getProductById(row.id)) ?? NewProduct();
  showModal.value = true;
}
function onDeleteProductClick(row: Product) {
  if (!row.id) return;
  productStore.deleteProduct(row.id);
}

onMounted(async () => {
  await productStore.fetchProducts();
  categoryStore.fetchCategories();
});
</script>

<template>
  <PageHeading>Products</PageHeading>
  <PageContentContainer>
    <AppButton
      :icon="ICON_NAMES.Plus"
      label="Add"
      outline
      color="primary"
      @click="onAddProductClick"
    />
    <AppTable
      :rows="productStore.products"
      :columns="productTableColumns"
      class="customer-table mt-sm"
      :loading="productStore.loading"
      @row-click="onEditProductClick"
      @delete="onDeleteProductClick"
    />
  </PageContentContainer>
  <ProductModal
    v-model:show-modal="showModal"
    v-model:product="localProduct"
    @hide="onHideModal"
  />
</template>

<style lang="scss" scoped>
:deep(thead tr:first-child th) {
  background-color: var(--primary-bg-color);
  color: var(--primary-text-color);
}
</style>
