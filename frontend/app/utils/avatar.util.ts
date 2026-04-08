export function getAvatarUrl(avatar: string | undefined) {
  if (!avatar) return undefined;
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  return `${baseUrl}${avatar}`;
}
