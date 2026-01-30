import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDate,
  IsInt,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GasTankDto } from './gas-tank.dto';

export class CreateDiveDto {
  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'The date when the dive occurred',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({
    example: 45,
    description: 'Total dive time in minutes',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  totalTime: number;

  @ApiProperty({
    example: 18.5,
    description: 'Maximum depth reached in meters',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  maxDepth: number;

  @ApiProperty({
    example: [
      {
        pressureStart: 200,
        pressureEnd: 50,
        gasMixes: [
          { type: 'oxygen', percentage: 21 },
          { type: 'nitrogen', percentage: 79 },
        ],
      },
    ],
    description: 'Array of gas tanks used during the dive',
    type: [GasTankDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GasTankDto)
  gasTanks: GasTankDto[];

  @ApiProperty({
    example: [1, 2],
    description: 'Array of diving type IDs',
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  divingTypeIds: number[];

  @ApiProperty({
    example: 1,
    description: 'Diving environment ID',
  })
  @IsNotEmpty()
  @IsInt()
  divingEnvironmentId: number;

  @ApiProperty({
    example: 1,
    description: 'Diving role ID',
  })
  @IsNotEmpty()
  @IsInt()
  divingRoleId: number;
}
