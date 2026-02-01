import type { FormUserCredentials } from "@/types/models/form";
import type { StoreUserDataInterface } from "@/types/models/storeUser";

/**
 * Composable to create a new user.
 * 
 * Returns reactive states for the user data, loading status, and errors.
 */
export const useCreateUser = () => {
  const config = useRuntimeConfig();
  
  const user = ref<StoreUserDataInterface | null>(null);
  const loading = ref(false);
  const error = ref<any>(null);

  const createUser = async (credentials: FormUserCredentials) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<StoreUserDataInterface>(`${config.public.apiBase}/users`, {
        method: "POST",
        body: credentials,
        watch: false,
      });

      if (fetchError.value) {
        throw fetchError.value;
      }

      user.value = data.value ?? null;      
    } catch (e: any) {
      error.value = e;      
    } finally {
      loading.value = false;
    }
  };

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    createUser,
  };
};
