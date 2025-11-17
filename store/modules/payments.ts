import { storage } from "../storage";
import type { PaymentMethod } from "@/types";

const calcBalance = (list: PaymentMethod[]) =>
  list.reduce((s, p) => s + p.balance, 0);

export const paymentsModule = (set, get) => ({
  paymentMethods: storage.get<PaymentMethod[]>("paymentMethods", [
    {
      id: "default-wallet",
      type: "cash",
      balance: 0,
      created_at: new Date().toISOString()
    }
  ]),

  totalBalance: calcBalance(storage.get<PaymentMethod[]>("paymentMethods", [])),

  fetchPaymentMethods: async () => {
    const list = storage.get("paymentMethods", []);
    set({
      paymentMethods: list,
      totalBalance: calcBalance(list),
    });
  },

  addPaymentMethod: async (pm: Omit<PaymentMethod, "id" | "created_at">) => {
    const newPM: PaymentMethod = {
      ...pm,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };

    const list = [...get().paymentMethods, newPM];
    storage.set("paymentMethods", list);

    set({
      paymentMethods: list,
      totalBalance: calcBalance(list),
    });
  },

  updatePaymentMethodBalance: async (id: string, balance: number) => {
    const updated = get().paymentMethods.map((p) =>
      p.id === id ? { ...p, balance } : p
    );

    storage.set("paymentMethods", updated);

    set({
      paymentMethods: updated,
      totalBalance: calcBalance(updated),
    });
  },
});
