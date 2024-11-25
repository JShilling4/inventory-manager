<script setup lang="ts">
import { onMounted, ref } from "vue";
import { PageHeading, PageContentContainer } from "@/components/layout";
import { AppButton, AppIcon } from "@/components/ui";
import { CustomerModal } from "@/views";
import clone from "lodash/clone";
import { ICON_NAMES } from "@/constants";
import { type Customer, NewCustomer } from "@/types";
import { useCustomerStore } from "@/stores";

const customerStore = useCustomerStore();

const showModal = ref(false);
const modalAction = ref<"Add" | "Edit">("Add");
const localCustomer = ref<Customer>(NewCustomer());

function onAddCustomerClick() {
  modalAction.value = "Add";
  showModal.value = true;
}

function onEditCustomerClick(_event: Event, row: Customer) {
  if (!row.id) return;
  localCustomer.value =
    clone(customerStore.getCustomerById(row.id)) ?? NewCustomer();
  modalAction.value = "Edit";
  showModal.value = true;
}

// function onDeleteCustomerClick(id: number) {
//   customerStore.deleteSong(id);
// }

function onHideModal() {
  localCustomer.value = NewCustomer();
}

onMounted(async () => {
  await customerStore.fetchCustomers();
});
</script>

<template>
  <PageHeading>Customers</PageHeading>
  <PageContentContainer>
    <AppButton @click="onAddCustomerClick">
      <AppIcon :name="ICON_NAMES.Plus" /> Add Customer
    </AppButton>

    <QTable
      :rows="customerStore.customers"
      class="customer-table mt-sm"
      :loading="customerStore.loading"
      @row-click="onEditCustomerClick"
    >
      <template #loading>
        <QInnerLoading showing color="primary" />
      </template>
    </QTable>
  </PageContentContainer>
  <CustomerModal
    v-model:show-modal="showModal"
    v-model:customer="localCustomer"
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
