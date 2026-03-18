import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsInt } from 'class-validator';

export class FindAllDivesBaseDto {
  @ApiPropertyOptional({ description: 'Filter by date' })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({ description: 'Filter by max depth' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxDepth?: number;

  @ApiPropertyOptional({ description: 'Filter by total time (duration)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  totalTime?: number;

  @ApiPropertyOptional({ description: 'Filter by diving environment label' })
  @IsOptional()
  @IsString()
  divingEnvironment?: string;

  @ApiPropertyOptional({ description: 'Limit the number of dives returned' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;

  @ApiPropertyOptional({ description: 'Offset the number of dives returned' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  offset?: number;
}

export class FindAllDivesDto extends FindAllDivesBaseDto {
  @ApiProperty({ description: 'Filter dives by user ID' })
  @IsString()
  userId: string;
}
