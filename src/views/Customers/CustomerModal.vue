<script setup lang="ts">
import { computed } from "vue";
import { AppDialog } from "@/components/layout";
import { FormInput } from "@/components/ui";
import { useCustomerStore } from "@/stores";
import { type Customer } from "@/types";

const customerStore = useCustomerStore();

const showModal = defineModel<boolean>("showModal");
const modalAction = computed(() => {
  return customer.value.id ? "Edit" : "Add";
});
function onCancelAction() {
  showModal.value = false;
}

const customer = defineModel<Customer>("customer", { required: true });
async function onSaveCustomer() {
  if (!customer.value) return;
  if (customer.value.id) {
    await customerStore.updateCustomer(customer.value);
  } else {
    await customerStore.createCustomer(customer.value);
  }
}
</script>

<template>
  <AppDialog
    v-model="showModal"
    persistent
    @confirm="onSaveCustomer"
    @cancel="onCancelAction"
  >
    <template #heading>
      <h6>{{ modalAction }} Customer</h6>
    </template>
    <template v-if="customer" #body>
      <div class="row">
        <FormInput
          v-model="customer.first_name"
          label="First Name"
          class="col"
        />
        <FormInput
          v-model="customer.last_name"
          label="Last Name"
          class="col ml-xs"
        />
      </div>
      <div class="row">
        <FormInput v-model="customer.phone" label="Phone" class="col" />
        <FormInput v-model="customer.email" label="Email" class="col ml-xs" />
      </div>
      <div class="row">
        <FormInput v-model="customer.address" label="Address" class="col" />
        <FormInput v-model="customer.city" label="City" class="col ml-xs" />
      </div>
      <div class="row">
        <FormInput v-model="customer.state" label="State" class="col" />
        <FormInput
          v-model="customer.zipcode"
          label="Zipcode"
          class="col ml-xs"
        />
      </div>
      <div class="row">
        <FormInput v-model="customer.company" label="Company" class="col" />
        <div class="col ml-xs"></div>
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
