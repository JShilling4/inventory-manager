<script setup lang="ts">
import { computed } from "vue";
import { useCustomerStore } from "@/stores";
import { type Customer } from "@/types";

const customerStore = useCustomerStore();

const customer = defineModel<Customer>("customer", { required: true });
const showModal = defineModel<boolean>("showModal");

const modalAction = computed(() => {
  return customer.value.id ? "Edit" : "Add";
});

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
  <QDialog v-model="showModal" persistent>
    <QCard class="modal-content">
      <QCardSection class="modal-heading row items-center bg-black text-white">
        <h6>{{ modalAction }} Customer</h6>
      </QCardSection>
      <QCardSection v-if="customer" class="modal-body">
        <div class="row">
          <QInput
            v-model="customer.first_name"
            label="First Name"
            class="col"
          />
          <QInput
            v-model="customer.last_name"
            label="Last Name"
            class="col ml-xs"
          />
        </div>
        <div class="row">
          <QInput v-model="customer.phone" label="Phone" class="col" />
          <QInput v-model="customer.email" label="Email" class="col ml-xs" />
        </div>
        <div class="row">
          <QInput v-model="customer.address" label="Address" class="col" />
          <QInput v-model="customer.city" label="City" class="col ml-xs" />
        </div>
        <div class="row">
          <QInput v-model="customer.state" label="State" class="col" />
          <QInput
            v-model="customer.zipcode"
            label="Zipcode"
            class="col ml-xs"
          />
        </div>
        <div class="row">
          <QInput v-model="customer.company" label="Company" class="col" />
          <div class="col ml-xs"></div>
        </div>
      </QCardSection>
      <QCardActions align="right" class="modal-controls">
        <QBtn v-close-popup outline label="Cancel" color="black" no-caps />
        <QBtn
          v-close-popup
          label="Save"
          color="green-10"
          no-caps
          @click="onSaveCustomer"
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
