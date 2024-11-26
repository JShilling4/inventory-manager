<script setup lang="ts">
import { computed } from "vue";
import { useCategoryStore, useProductStore } from "@/stores";
import { type Product } from "@/types";
import { PRODUCT_STATUSES } from "@/constants";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const product = defineModel<Product>("product", { required: true });
const showModal = defineModel<boolean>("showModal");

const modalAction = computed(() => {
  return product.value.id ? "Edit" : "Add";
});

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
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ modalAction }} Product</h6>
      </QCardSection>
      <QCardSection v-if="product" class="modal-body">
        <div class="row">
          <QInput v-model="product.name" label="Name" class="col" />
        </div>
        <div class="row">
          <QInput
            v-model="product.description"
            label="Description"
            class="col"
          />
        </div>
        <QSelect
          v-model="product.category_id"
          :options="
            categoryStore.categories.map((c) => {
              return { label: c.name, value: c.id };
            })
          "
          label="Category"
          emit-value
          map-options
        />
        <div class="row">
          <QInput v-model="product.price" label="Price" class="col" />
          <QInput
            v-model="product.quantity"
            label="Quantity"
            class="col ml-sm"
          />
        </div>
        <div class="row">
          <QSelect
            v-model="product.status"
            :options="PRODUCT_STATUSES"
            label="Status"
            behavior="menu"
            class="col"
          />
          <QInput v-model="product.sku" label="Sku" class="col ml-sm" />
        </div>
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <QBtn v-close-popup outline label="Cancel" color="black" no-caps />
        <QBtn
          v-close-popup
          label="Save"
          color="green-10"
          no-caps
          @click="onSaveProduct"
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
