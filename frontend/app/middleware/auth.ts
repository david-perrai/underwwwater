/**
 * Auth Middleware
 *
 * Vérifie que l'utilisateur est authentifié côté serveur ET client.
 * Lit l'accessToken depuis le cookie (accessible en SSR via useCookie).
 * Redirige vers /login si aucune session valide n'est trouvée.
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie("accessToken");
  const userStore = useUserStore();
  const auth = useAuthToken();
  const toRedirectPath = ["/login"];

  if (accessToken.value && !auth.isTokenExpired(accessToken.value)) {
    if (!userStore.isLoggedIn) {
      userStore.loadFromToken(accessToken.value);
      if (toRedirectPath.includes(to.path)) {
        return navigateTo("/dashboard");
      }
    }
    return;
  }

  const isRefreshSuccess = await auth.refreshToken();

  if (isRefreshSuccess && to.path === "/login") return navigateTo("/dashboard");
  if (!isRefreshSuccess && to.path === "/login") return;

  if (isRefreshSuccess) return;

  return navigateTo("/login");
});
