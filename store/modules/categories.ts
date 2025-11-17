import { storage } from "../storage";
import type { Category } from '@/types';

export const categoriesModule = (set, get) => ({
  categories: storage.get<Category[]>("categories", []),

  fetchCategories: async () => {
    set({ categories: storage.get("categories", []) });
  },

  addCategory: async (cat: Omit<Category, "id">) => {
    const newCat: Category = { id: Date.now().toString(), ...cat };
    const list = [...get().categories, newCat];

    storage.set("categories", list);
    set({ categories: list });
  },
});
