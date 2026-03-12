import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDivingTypeDto {
  @ApiProperty({
    example: 'Recreational',
    description: 'Label of the diving type',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  label: string;

  @ApiProperty({
    example: 'recreational',
    description: 'Token/slug of the diving type',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  token: string;
}
