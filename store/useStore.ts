import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

// MMKV отключён для Expo Go
// import { createMMKV } from "react-native-mmkv";
// export const storage = createMMKV();

// Временное хранилище (вместо MMKV)
const tempStorage: Record<string, string> = {};

const saveToStorage = (key: string, value: any) => {
  tempStorage[key] = JSON.stringify(value);
};

const getFromStorage = <T>(key: string, fallback: T): T => {
  const raw = tempStorage[key];
  return raw ? (JSON.parse(raw) as T) : fallback;
};

// === TYPES ===
export interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  note?: string;
  date: string;
}

export interface Balance {
  total: number;
  updated_at?: string;
}

interface StoreState {
  user: any | null;
  setUser: (user: any | null) => void;

  balance: Balance;
  fetchBalance: () => Promise<void>;
  updateBalance: (newAmount: number) => Promise<void>;

  statement: Transaction[];
  fetchStatement: () => Promise<void>;
  uploadStatement: (file: any) => Promise<void>;

  addTransaction: (t: Omit<Transaction, "id">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;

  syncData: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  // === INITIAL STATE ===
  user: getFromStorage("user", null),
  balance: getFromStorage("balance", { total: 0 }),
  statement: getFromStorage("statement", []),

  // === USER ===
  setUser: (user) => {
    saveToStorage("user", user);
    set({ user });
  },

  register: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    saveToStorage("user", data.user);
    set({ user: data.user });
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const session = data.session;
    if (session) {
      saveToStorage("user", session.user);
      saveToStorage("jwt", session.access_token);
      set({ user: session.user });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    delete tempStorage["user"];
    delete tempStorage["jwt"];
    set({ user: null });
  },

  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "financeapp://resetPassword",
    });
    if (error) throw error;
  },

  // === BALANCE ===
  fetchBalance: async () => {
    const localBalance = getFromStorage("balance", { total: 0 });
    set({ balance: localBalance });
  },

  updateBalance: async (newAmount) => {
    const updated = { total: newAmount, updated_at: new Date().toISOString() };
    saveToStorage("balance", updated);
    set({ balance: updated });
  },

  // === STATEMENT ===
  fetchStatement: async () => {
    const localStatement = getFromStorage<Transaction[]>("statement", []);
    set({ statement: localStatement });
  },

  uploadStatement: async (file) => {
    console.log("➡️ [uploadStatement] — mock upload", file);
  },

  addTransaction: async (t) => {
    const { statement, balance } = get();
    const newItem: Transaction = { ...t, id: Date.now().toString() };
    const newList = [newItem, ...statement];
    saveToStorage("statement", newList);

    const newBalance =
      t.type === "income"
        ? balance.total + t.amount
        : balance.total - t.amount;

    const updatedBalance = {
      total: newBalance,
      updated_at: new Date().toISOString(),
    };
    saveToStorage("balance", updatedBalance);
    set({ statement: newList, balance: updatedBalance });
  },

  deleteTransaction: async (id) => {
    const { statement, balance } = get();

    // Find the deleted transaction
    const deletedTx = statement.find((t) => t.id === id);
    if (!deletedTx) return;

    // Create a new list without it
    const newList = statement.filter((t) => t.id !== id);
    saveToStorage("statement", newList);

    // Adjust balance depending on transaction type
    const newBalance =
      deletedTx.type === "income"
        ? balance.total - deletedTx.amount // removing income decreases balance
        : balance.total + deletedTx.amount; // removing expense increases balance

    const updatedBalance = {
      total: newBalance,
      updated_at: new Date().toISOString(),
    };
    saveToStorage("balance", updatedBalance);

    // Update store
    set({ statement: newList, balance: updatedBalance });
  },

  syncData: async () => {
    console.log("🔄 [syncData] — mock sync with server");
  },
}));
