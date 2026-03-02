import { useAuthControllerLogin } from "./api/generated/auth/auth";

interface loginResponse {
  success: boolean;
  message: string;
}

interface UseAuth {
  login: (email: string, password: string) => Promise<loginResponse>;
}

export const useAuth = (): UseAuth => {
  const userStore = useUserStore();
  const loginMutation = useAuthControllerLogin();
  const { t } = useI18n();

  const login = async (
    email: string,
    password: string,
  ): Promise<loginResponse> => {
    const loginMutationResponse = await loginMutation.mutateAsync({
      data: {
        email: email,
        password: password,
      },
    });

    if (loginMutationResponse.status === 200) {
      const accessToken = loginMutationResponse.data.accessToken;
      userStore.loadFromToken(accessToken);
      return { success: true, message: t("auth.login.success") };
    }

    return { success: false, message: t("auth.login.errors.loginFail") };
  };

  return {
    login,
  };
};
