import { ApiProperty } from '@nestjs/swagger';

export class LongestDive {
  @ApiProperty()
  totalTime: number;

  @ApiProperty()
  username: string;
}

export class DeepestDive {
  @ApiProperty()
  maxDepth: number;

  @ApiProperty()
  username: string;
}

export class FirstSubscribedUser {
  @ApiProperty()
  subscribedAt: Date;

  @ApiProperty()
  username: string;
}

export class LastSubscribedUser {
  @ApiProperty()
  subscribedAt: Date;

  @ApiProperty()
  username: string;
}

export class MostActiveDiver {
  @ApiProperty()
  count: number;

  @ApiProperty()
  username: string;
}

export class TotalDives {
  @ApiProperty()
  count: number;
}

export class TotalUsers {
  @ApiProperty()
  count: number;
}

export class GlobalStats {
  @ApiProperty()
  longestDive: LongestDive | undefined;

  @ApiProperty()
  deepestDive: DeepestDive | undefined;

  @ApiProperty()
  firstSubscribedUser: FirstSubscribedUser | undefined;

  @ApiProperty()
  lastSubscribedUser: LastSubscribedUser | undefined;

  @ApiProperty()
  mostActiveDiver: MostActiveDiver | undefined;

  @ApiProperty()
  totalDives: TotalDives | undefined;

  @ApiProperty()
  totalUsers: TotalUsers | undefined;
}

export class AverageDepthPerMonth {
  @ApiProperty({ example: '2024-01' })
  month: string;

  @ApiProperty({ example: 18.5 })
  averageDepth: number;
}

export class DiveStatItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: string;

  @ApiProperty({ required: false })
  totalTime?: number;

  @ApiProperty({ required: false })
  maxDepth?: number;
}

export class CountStatItem {
  @ApiProperty()
  name: string;

  @ApiProperty()
  count: number;
}

export class UserStats {
  @ApiProperty()
  numberOfDives: number;

  @ApiProperty()
  totalImmersedTimeInMinutes: number;

  @ApiProperty({ type: [AverageDepthPerMonth] })
  averageDepthPerMonth: AverageDepthPerMonth[];

  @ApiProperty({ required: false })
  shortestDiveTime: number | null;

  @ApiProperty({ type: [DiveStatItem] })
  top5LongestDives: DiveStatItem[];

  @ApiProperty({ type: [DiveStatItem] })
  top5DeepestDives: DiveStatItem[];

  @ApiProperty({ type: [CountStatItem] })
  divesOverRoles: CountStatItem[];

  @ApiProperty({ type: [CountStatItem] })
  divesOverEnvironments: CountStatItem[];

  @ApiProperty({ type: [CountStatItem] })
  divesOverTypes: CountStatItem[];

  @ApiProperty()
  multiTanksDivesCount: number;

  @ApiProperty({ required: false })
  averageConsumptionBar: number | null;
}
