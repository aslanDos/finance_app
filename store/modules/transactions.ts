import { storage } from "../storage";
import type { Transaction } from "@/types";

export const transactionsModule = (set, get) => ({

  transactions: storage.get<Transaction[]>("transactions", []),

  fetchTransactions: async () => {
    set({ transactions: storage.get("transactions", []) });
  },

  addTransaction: async (t: Omit<Transaction, "id" | "date">) => {
    const newTx: Transaction = {
      ...t,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    // обновление баланса — вызываем из payment модуля
    const pm = get().paymentMethods.find((p) => p.id === t.payment_id);

    if (pm) {
      let newBalance = pm.balance;

      if (t.type === "income") newBalance += t.amount;
      if (t.type === "expense") newBalance -= t.amount;

      await get().updatePaymentMethodBalance(pm.id, newBalance);
    }

    const list = [newTx, ...get().transactions];

    storage.set("transactions", list);
    set({ transactions: list });
  },

  deleteTransaction: async (id: string) => {
    const tx = get().transactions.find((t) => t.id === id);
    if (!tx) return;

    const pm = get().paymentMethods.find((p) => p.id === tx.payment_id);

    if (pm) {
      let newBalance = pm.balance;

      if (tx.type === "income") newBalance -= tx.amount;
      if (tx.type === "expense") newBalance += tx.amount;

      await get().updatePaymentMethodBalance(pm.id, newBalance);
    }

    const list = get().transactions.filter((t) => t.id !== id);

    storage.set("transactions", list);
    set({ transactions: list });
  },
});
