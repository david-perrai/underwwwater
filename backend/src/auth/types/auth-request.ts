import { type Request } from 'express';

export type AuthenticatedRequest = Request & {
  user: {
    id: number;
    email: string;
  };
};
