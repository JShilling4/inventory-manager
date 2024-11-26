import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/plugins/supabase";
import { type Product, Tables } from "@/types";

interface State {
  products: Product[];
  loading: boolean;
}

export const useProductStore = defineStore("products", {
  state: (): State => {
    return {
      products: [],
      loading: false,
    };
  },

  actions: {
    async fetchProducts() {
      if (this.products.length) return;

      try {
        this.loading = true;
        const { data: products, error } = await supabase
          .from("product")
          .select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (products) this.products = products;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id: number) {
      try {
        this.loading = true;
        const { error } = await supabase.from("product").delete().eq("id", id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.products.findIndex((s) => s.id === id);
          if (target !== -1) {
            this.products.splice(target, 1);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createProduct(product: Product) {
      if (!product) return;

      try {
        const { data, error } = await supabase
          .from("product")
          .insert(product)
          .select()
          .returns<Tables<"product">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.products.push(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateProduct(product: Product) {
      if (!product.id) return;

      try {
        const { error } = await supabase
          .from("product")
          .update({ ...product })
          .eq("id", product.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.products.findIndex((s) => s.id === product.id);
          if (target !== -1) {
            this.products.splice(target, 1, product);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find((product) => product.id === id);
    },
  },
});
