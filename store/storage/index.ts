// Временное хранилище (для разработки)
const temp: Record<string, string> = {};

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = temp[key];
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key: string, value: unknown) {
    temp[key] = JSON.stringify(value);
  },

  remove(key: string) {
    delete temp[key];
  },
};
