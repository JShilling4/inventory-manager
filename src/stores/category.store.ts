import { defineStore } from "pinia";
import { Notify } from "quasar";
import supabase from "@/plugins/supabase";
import { type Category, Tables } from "@/types";

interface State {
  categories: Category[];
  loading: boolean;
}

export const useCategoryStore = defineStore("categories", {
  state: (): State => {
    return {
      categories: [],
      loading: false,
    };
  },

  actions: {
    async fetchCategories() {
      if (this.categories.length) return;

      try {
        this.loading = true;
        const { data: categories, error } = await supabase
          .from("category")
          .select("*");

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (categories) this.categories = categories;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(id: number) {
      try {
        this.loading = true;
        const { error } = await supabase.from("category").delete().eq("id", id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.categories.findIndex((s) => s.id === id);
          if (target !== -1) {
            this.categories.splice(target, 1);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async createCategory(category: Category) {
      if (!category) return;

      try {
        const { data, error } = await supabase
          .from("category")
          .insert(category)
          .select()
          .returns<Tables<"category">[]>();

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (data) {
          this.categories.push(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateCategory(category: Category) {
      if (!category.id) return;

      try {
        const { error } = await supabase
          .from("category")
          .update({ ...category })
          .eq("id", category.id);

        if (error) {
          Notify.create({
            type: "negative",
            message: error.message,
          });
          throw error;
        }

        if (!error) {
          const target = this.categories.findIndex((s) => s.id === category.id);
          if (target !== -1) {
            this.categories.splice(target, 1, category);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    getCategoryById: (state) => (id: number) => {
      return state.categories.find((category) => category.id === id);
    },
  },
});
