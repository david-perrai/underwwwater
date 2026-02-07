export interface IAuthenticatedUser {
  id: number;
  email: string;
  roles: string[];
  refreshToken?: string;
}
