import { ApiProperty } from '@nestjs/swagger';
import { Dive } from '@/domain/dives/entities/dive.entity';

export class DiveCountDto {
  @ApiProperty({
    example: 10,
    description: 'Number of dives',
  })
  count: number;

  @ApiProperty({
    description: 'Array of dives',
    type: () => [Dive],
  })
  dives: Dive[];
}
