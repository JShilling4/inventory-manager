<script setup lang="ts">
import { onMounted, ref } from "vue";
import { PageHeading, PageContentContainer } from "@/components/layout";
import { AppButton, AppTable } from "@/components/ui";
import { CustomerModal } from "@/views";
import { useCustomerStore } from "@/stores";
import clone from "lodash/clone";
import { ICON_NAMES } from "@/constants";
import { type Customer, NewCustomer } from "@/types";
import { type QTableProps } from "quasar";

const customerStore = useCustomerStore();

const showModal = ref(false);
const modalAction = ref<"Add" | "Edit">("Add");
const localCustomer = ref<Customer>(NewCustomer());
const customerTableColumns: QTableProps["columns"] = [
  {
    name: "company",
    required: true,
    label: "Company",
    align: "left",
    field: (row: Customer) => row.company,
    sortable: true,
  },
  {
    name: "first_name",
    required: true,
    label: "First Name",
    align: "left",
    field: (row: Customer) => row.first_name,
    sortable: true,
  },
  {
    name: "last_name",
    required: false,
    label: "Last Name",
    align: "left",
    field: (row: Customer) => row.last_name,
    sortable: false,
  },
  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: (row: Customer) => row.email,
    sortable: false,
  },
  {
    name: "phone",
    required: true,
    label: "Phone",
    align: "center",
    field: (row: Customer) => row.phone,
    sortable: true,
  },
  {
    name: "address",
    required: true,
    label: "Address",
    align: "left",
    field: (row: Customer) => row.address,
    sortable: true,
  },
  {
    name: "city",
    required: true,
    label: "City",
    align: "left",
    field: (row: Customer) => row.city,
    sortable: true,
  },
  {
    name: "state",
    required: true,
    label: "State",
    align: "left",
    field: (row: Customer) => row.state,
    sortable: true,
  },
  {
    name: "delete",
    label: "",
    field: "",
    sortable: false,
  },
];

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

function onDeleteCustomerClick(row: Customer) {
  if (!row.id) return;
  customerStore.deleteCustomer(row.id);
}

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
    <AppButton
      :icon="ICON_NAMES.Plus"
      label="Add"
      color="primary"
      outline
      @click="onAddCustomerClick"
    >
    </AppButton>
    <AppTable
      :rows="customerStore.customers"
      :columns="customerTableColumns"
      class="customer-table mt-sm"
      :loading="customerStore.loading"
      @row-click="onEditCustomerClick"
      @delete="onDeleteCustomerClick"
    />
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
