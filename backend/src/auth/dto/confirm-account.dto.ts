import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmAccountDto {
  @ApiProperty({
    example: 'a1b2c3d4e5...',
    description: 'The confirmation token received by email',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
