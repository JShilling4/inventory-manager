<script setup lang="ts">
import { computed } from "vue";
import { AppDialog } from "@/components/layout";
import { FormInput, FormSelect } from "@/components/ui";
import { useCategoryStore, useProductStore } from "@/stores";
import { type Product } from "@/types";
import { PRODUCT_STATUSES } from "@/constants";

const categoryStore = useCategoryStore();
const categoryOptions = computed(() => {
  return categoryStore.categories.map((c) => {
    return { label: c.name, value: c.id };
  });
});

const showModal = defineModel<boolean>("showModal");
const modalAction = computed(() => {
  return product.value.id ? "Edit" : "Add";
});
function onCancelAction() {
  showModal.value = false;
}

const productStore = useProductStore();
const product = defineModel<Product>("product", { required: true });
async function onSaveProduct() {
  if (!product.value) return;
  if (product.value.id) {
    await productStore.updateProduct(product.value);
  } else {
    await productStore.createProduct(product.value);
  }
  showModal.value = false;
}
</script>

<template>
  <AppDialog
    v-model="showModal"
    persistent
    @confirm="onSaveProduct"
    @cancel="onCancelAction"
  >
    <template #heading>
      <h6>{{ modalAction }} Product</h6>
    </template>
    <template v-if="product" #body>
      <div class="row">
        <FormInput v-model="product.name" label="Name" class="col" />
      </div>
      <div class="row">
        <FormInput
          v-model="product.description"
          label="Description"
          class="col"
        />
      </div>
      <FormSelect
        v-model="product.category_id"
        :options="categoryOptions"
        label="Category"
        emit-value
        map-options
      />
      <div class="row">
        <FormInput v-model="product.price" label="Price" class="col" />
        <FormInput
          v-model="product.quantity"
          label="Quantity"
          class="col ml-sm"
        />
      </div>
      <div class="row">
        <FormSelect
          v-model="product.status"
          :options="PRODUCT_STATUSES"
          label="Status"
          behavior="menu"
          class="col"
        />
        <FormInput v-model="product.sku" label="Sku" class="col ml-sm" />
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
