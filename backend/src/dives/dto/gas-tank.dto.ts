import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsNumber,
  Min,
  Max,
  ValidateNested,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GasType } from '../entities/gas.entity';

export class GasMixDto {
  @ApiProperty({
    example: GasType.OXYGEN,
    description: 'The type of gas',
    enum: GasType,
  })
  @IsEnum(GasType)
  type: GasType;

  @ApiProperty({
    example: 21,
    description: 'Gas percentage',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;
}

export class GasTankDto {
  @ApiProperty({
    example: 200,
    description: 'Tank pressure at start in bar',
  })
  @IsInt()
  @Min(0)
  pressureStart: number;

  @ApiProperty({
    example: 50,
    description: 'Tank pressure at end in bar',
  })
  @IsInt()
  @Min(0)
  pressureEnd: number;

  @ApiProperty({
    description: 'Gas mix composition',
    type: [GasMixDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GasMixDto)
  gasMixes: GasMixDto[];
}
