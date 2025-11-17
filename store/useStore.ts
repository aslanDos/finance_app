import { create } from "zustand";

import { authModule } from "./modules/auth";
import { categoriesModule } from "./modules/categories";
import { paymentsModule } from "./modules/payments";
import { transactionsModule } from "./modules/transactions";

export const useStore = create((set, get) => ({
  ...authModule(set, get),
  ...categoriesModule(set, get),
  ...paymentsModule(set, get),
  ...transactionsModule(set, get),
}));
