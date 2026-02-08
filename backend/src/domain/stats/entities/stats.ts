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

export class UserStats {
  @ApiProperty()
  numberOfDives: number;

  @ApiProperty()
  totalImmersedTimeInMinutes: number;

  @ApiProperty({ type: [AverageDepthPerMonth] })
  averageDepthPerMonth: AverageDepthPerMonth[];
}
