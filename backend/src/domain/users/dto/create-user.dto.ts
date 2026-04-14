import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'example@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The username of the user', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The password of the user', example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The nationality of the user',
    example: 'FR',
    required: false,
  })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({
    description: 'The avatar of the user',
    example: 'avatar',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    description: 'Turnstile token',
    example: '0x4AAAAAACAA8_l3Zc_1234567890',
  })
  @IsString()
  turnstileToken: string;
}
