<script setup lang="ts">
import { computed } from "vue";
import { AppDialog } from "@/components/layout";
import { AppButton, FormInput, FormSelect } from "@/components/ui";
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

const productStore = useProductStore();
const product = defineModel<Product>("product", { required: true });
async function onSaveProduct() {
  if (!product.value) return;
  if (product.value.id) {
    await productStore.updateProduct(product.value);
  } else {
    await productStore.createProduct(product.value);
  }
}
</script>

<template>
  <AppDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ modalAction }} Product</h6>
      </QCardSection>
      <QCardSection v-if="product" class="modal-body">
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
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <AppButton v-close-popup outline label="Cancel" color="black" no-caps />
        <AppButton
          v-close-popup
          label="Save"
          color="green-10"
          no-caps
          @click="onSaveProduct"
        />
      </QCardActions>
    </QCard>
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
