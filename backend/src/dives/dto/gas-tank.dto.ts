import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsNumber,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GasMixDto {
  @ApiProperty({
    example: 21,
    description: 'Oxygen percentage',
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  oxygen: number;

  @ApiProperty({
    example: 79,
    description: 'Nitrogen percentage',
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  nitrogen: number;

  @ApiProperty({
    example: 0,
    description: 'Helium percentage',
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  helium: number;
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
    type: GasMixDto,
  })
  @ValidateNested()
  @Type(() => GasMixDto)
  gasMix: GasMixDto;
}
