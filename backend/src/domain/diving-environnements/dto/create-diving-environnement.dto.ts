import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDivingEnvironnementDto {
  @ApiProperty({
    example: 'Ocean',
    description: 'Label of the diving environment',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  label: string;

  @ApiProperty({
    example: 'ocean',
    description: 'Token/slug of the diving environment',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  token: string;
}
