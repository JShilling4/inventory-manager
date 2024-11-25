import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/plugins/supabase";
import { type Customer, Tables } from "@/types";

interface State {
  customers: Customer[];
  loading: boolean;
}

export const useCustomerStore = defineStore("customers", {
  state: (): State => {
    return {
      customers: [],
      loading: false,
    };
  },

  actions: {
    async fetchCustomers() {
      if (this.customers.length) return;

      try {
        this.loading = true;
        const { data: customers, error } = await supabase
          .from("customer")
          .select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (customers) this.customers = customers;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteCustomer(id: number) {
      try {
        this.loading = true;
        const { error } = await supabase.from("customer").delete().eq("id", id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.customers.findIndex((s) => s.id === id);
          if (target !== -1) {
            this.customers.splice(target, 1);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createCustomer(customer: Customer) {
      if (!customer) return;

      try {
        const { data, error } = await supabase
          .from("customer")
          .insert(customer)
          .select()
          .returns<Tables<"customer">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.customers.push(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateCustomer(customer: Customer) {
      if (!customer.id) return;

      try {
        const { error } = await supabase
          .from("customer")
          .update({ ...customer })
          .eq("id", customer.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.customers.findIndex((s) => s.id === customer.id);
          if (target !== -1) {
            this.customers.splice(target, 1, customer);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getCustomerById: (state) => (id: number) => {
      return state.customers.find((customer) => customer.id === id);
    },
  },
});
