export interface JWTAuthInterface {
  accessToken: string | null;
}

export interface UserInterface {
    id: number | null;
    email: string | null;
    username: string | null;
    roles: string[] | [];
    avatar: string | null;
    subscribedAt?: Date | null;
    updatedAt?: Date | null;
    activatedAt?: Date | null;
    iat?: number | null;
    exp?: number | null;
}
