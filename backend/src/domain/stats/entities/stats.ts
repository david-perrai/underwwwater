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
  longestDive: LongestDive;

  @ApiProperty()
  deepestDive: DeepestDive;

  @ApiProperty()
  firstSubscribedUser: FirstSubscribedUser;

  @ApiProperty()
  lastSubscribedUser: LastSubscribedUser;

  @ApiProperty()
  mostActiveDiver: MostActiveDiver;

  @ApiProperty()
  totalDives: TotalDives;

  @ApiProperty()
  totalUsers: TotalUsers;
}
