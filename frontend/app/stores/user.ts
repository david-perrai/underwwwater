import { defineStore } from "pinia";
import type { User } from "~/composables/api/generated/model";

/**
 * User Store
 */
export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);

  const isLoggedIn = computed(() => !!user.value);

  const loadFromToken = async (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1] || ""));
      user.value = payload;
    } catch {
      user.value = null;
    }
  };

  const clear = () => {
    user.value = null;
  };

  const update = (userData: User) => {
    user.value = userData;
  };

  return {
    user,
    update,
    loading,
    isLoggedIn,
    loadFromToken,
    clear,
  };
});
