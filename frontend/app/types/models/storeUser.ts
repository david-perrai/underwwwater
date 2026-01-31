export interface StoreUserInterface {
  token: string | null;
  refresh_token: string | null;
  data: StoreUserDataInterface;
}

export interface StoreUserDataInterface {
  iat: number | null;
  exp: number | null;
  id: string | null;
  email: string | null;
  roles: [];
  username: string | null;
  avatar: string | null;
}
