import { ApiProperty } from '@nestjs/swagger';

export interface IAuthenticatedUser {
  id: number;
  email: string;
  roles: string[];
  refreshToken?: string;
}

export class IAuthResponse {
  @ApiProperty({ description: 'Access token', example: 'access-token' })
  accessToken: string;
}
