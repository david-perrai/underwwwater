import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
}
