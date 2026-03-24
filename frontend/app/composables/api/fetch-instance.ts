

export const authFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const auth = useAuthToken();
  const accessToken = useCookie('accessToken');

  // Ne pas intercepter les appels d'auth pour éviter les boucles infinies
  const isAuthPath = url.includes('/auth/login') || url.includes('/auth/refresh');
  
  if (!isAuthPath ) {
    if ((accessToken.value && auth.isTokenExpired(accessToken.value)) || !accessToken.value) {
      // Tentative de refresh
      await auth.refreshToken();
    }
  }

  const headers = new Headers(options.headers);
  if (accessToken.value) {
    headers.set('Authorization', `Bearer ${accessToken.value}`);
  }

  // Forward cookies if on server
  if (import.meta.server) {
    const requestHeaders = useRequestHeaders(['cookie']);
    if (requestHeaders.cookie) {
      headers.set('cookie', requestHeaders.cookie);
    }
  }

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  // Gérer le cas où le token expire pile au moment de l'appel (401)
  if (response.status === 401 && !isAuthPath) {
     accessToken.value = null;
  }

  const data = await response.json();

  const plainHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    plainHeaders[key] = value;
  });

  return {
    data,
    status: response.status,
    headers: plainHeaders as unknown as Headers,
  } as T;
};
