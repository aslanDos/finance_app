import { storage } from "../storage";

export const authModule = (set, get) => ({
  user: storage.get("user", null),

  setUser: (user) => {
    storage.set("user", user);
    set({ user });
  },

  register: async () => {},
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});
