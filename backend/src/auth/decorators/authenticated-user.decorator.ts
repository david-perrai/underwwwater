import { IAuthenticatedUser } from '@auth/types/authenticated-user';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as unknown as IAuthenticatedUser;
  },
);
