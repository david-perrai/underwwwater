import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  LongestDive,
  DeepestDive,
  FirstSubscribedUser,
  LastSubscribedUser,
  MostActiveDiver,
  TotalDives,
  TotalUsers,
  GlobalStats,
  UserStats,
  AverageDepthPerMonth,
  CountStatItem,
} from './entities/stats';

@Injectable()
export class StatsService {
  constructor(private dataSource: DataSource) {}

  private mapCountStatItem(res: CountStatItem[]): CountStatItem[] {
    return res.map((item) => ({
      name: item.name,
      count: Number(item.count),
    }));
  }

  private async getLongestDive(): Promise<LongestDive[]> {
    return this.dataSource.query(
      'SELECT "totalTime" , users.username FROM dives INNER JOIN users ON users.id = dives."ownerId" WHERE "totalTime"  = ( SELECT MAX("totalTime") FROM dives)',
    );
  }

  private async getDeepestDive(): Promise<DeepestDive[]> {
    return this.dataSource.query(
      'SELECT "maxDepth" , users.username FROM dives INNER JOIN users ON users.id = dives."ownerId" WHERE "maxDepth"  = ( SELECT MAX("maxDepth") FROM dives)',
    );
  }

  private async getFirstSubscribedUser(): Promise<FirstSubscribedUser[]> {
    return this.dataSource.query(
      'SELECT "subscribedAt" , users.username FROM users WHERE "subscribedAt"  = ( SELECT MIN("subscribedAt") FROM users)',
    );
  }

  private async getLastSubscribedUser(): Promise<LastSubscribedUser[]> {
    return this.dataSource.query(
      'SELECT "subscribedAt" , users.username FROM users WHERE "subscribedAt"  = ( SELECT MAX("subscribedAt") FROM users)',
    );
  }

  private async getMostActiveDiver(): Promise<MostActiveDiver[]> {
    return this.dataSource.query(
      'SELECT COUNT(*) , users.username FROM dives INNER JOIN users ON users.id = dives."ownerId" GROUP BY users.username ORDER BY COUNT(*) DESC LIMIT 1',
    );
  }

  private async getTotalDives(): Promise<TotalDives[]> {
    return this.dataSource.query('SELECT COUNT(*) FROM dives');
  }

  private async getTotalUsers(): Promise<TotalUsers[]> {
    return this.dataSource.query('SELECT COUNT(*) FROM users');
  }

  private async countDivesByOwnerId(ownerId: number): Promise<number> {
    const res = await this.dataSource.query<{ count: number }[]>(
      'SELECT COUNT(*) as count FROM dives WHERE "ownerId" = $1',
      [ownerId],
    );
    return res?.[0]?.count ? Number(res[0].count) : 0;
  }

  private async totalImmersedTimeInMinutes(ownerId: number): Promise<number> {
    const res = await this.dataSource.query<{ sum: number }[]>(
      'SELECT SUM("totalTime") as sum FROM dives WHERE "ownerId" = $1',
      [ownerId],
    );
    return res?.[0]?.sum ? Number(res[0].sum) : 0;
  }

  private async getAverageDepthPerMonth(
    userId: number,
  ): Promise<AverageDepthPerMonth[]> {
    return this.dataSource.query<AverageDepthPerMonth[]>(
      `SELECT 
        TO_CHAR(date, 'YYYY-MM-01') as month, 
        AVG("maxDepth") as "averageDepth"
      FROM dives
      WHERE "ownerId" = $1
      GROUP BY month
      ORDER BY month ASC`,
      [userId],
    );
  }

  async getGlobalStats(): Promise<GlobalStats> {
    const [
      longestDive,
      deepestDive,
      firstSubscribedUser,
      lastSubscribedUser,
      mostActiveDiver,
      totalDives,
      totalUsers,
    ] = await Promise.all([
      this.getLongestDive(),
      this.getDeepestDive(),
      this.getFirstSubscribedUser(),
      this.getLastSubscribedUser(),
      this.getMostActiveDiver(),
      this.getTotalDives(),
      this.getTotalUsers(),
    ]);

    return {
      longestDive: longestDive[0],
      deepestDive: deepestDive[0],
      firstSubscribedUser: firstSubscribedUser[0],
      lastSubscribedUser: lastSubscribedUser[0],
      mostActiveDiver: mostActiveDiver[0],
      totalDives: totalDives[0],
      totalUsers: totalUsers[0],
    };
  }

  private async getShortestDiveTime(ownerId: number): Promise<number | null> {
    const res = await this.dataSource.query(
      'SELECT MIN("totalTime") as min FROM dives WHERE "ownerId" = $1',
      [ownerId],
    );
    return res?.[0]?.min ? Number(res[0].min) : null;
  }

  private async getTop5LongestDives(ownerId: number): Promise<any[]> {
    return this.dataSource.query(
      'SELECT id, date, "totalTime" FROM dives WHERE "ownerId" = $1 ORDER BY "totalTime" DESC LIMIT 5',
      [ownerId],
    );
  }

  private async getTop5DeepestDives(ownerId: number): Promise<any[]> {
    return this.dataSource.query(
      'SELECT id, date, "maxDepth" FROM dives WHERE "ownerId" = $1 ORDER BY "maxDepth" DESC LIMIT 5',
      [ownerId],
    );
  }

  private async getDivesOverRoles(ownerId: number): Promise<CountStatItem[]> {
    const res = await this.dataSource.query<CountStatItem[]>(
      'SELECT "diverRole" as name, COUNT(*) as count FROM dives WHERE "ownerId" = $1 GROUP BY "diverRole"',
      [ownerId],
    );
    return this.mapCountStatItem(res);
  }

  private async getDivesOverEnvironments(
    ownerId: number,
  ): Promise<CountStatItem[]> {
    const res = await this.dataSource.query<CountStatItem[]>(
      'SELECT e.label as name, COUNT(*) as count FROM dives d INNER JOIN diving_environments e ON e.id = d."divingEnvironmentId" WHERE d."ownerId" = $1 GROUP BY e.label',
      [ownerId],
    );
    return this.mapCountStatItem(res);
  }

  private async getDivesOverTypes(ownerId: number): Promise<CountStatItem[]> {
    const res = await this.dataSource.query<CountStatItem[]>(
      'SELECT t.label as name, COUNT(*) as count FROM dives d INNER JOIN diving_types_dives dtd ON dtd."divesId" = d.id INNER JOIN diving_types t ON t.id = dtd."divingTypesId" WHERE d."ownerId" = $1 GROUP BY t.label',
      [ownerId],
    );

    return this.mapCountStatItem(res);
  }

  private async getMultiTanksDivesCount(ownerId: number): Promise<number> {
    const res = await this.dataSource.query<{ count: number }[]>(
      'SELECT COUNT(*) as count FROM (SELECT "diveId" FROM gas_tanks gt INNER JOIN dives d ON d.id = gt."diveId" WHERE d."ownerId" = $1 GROUP BY "diveId" HAVING COUNT(gt.id) > 1) mt',
      [ownerId],
    );
    return res?.[0]?.count ? Number(res[0].count) : 0;
  }

  private async getAverageConsumptionBar(ownerId: number): Promise<number> {
    const res = await this.dataSource.query(
      'SELECT AVG("pressureStart" - "pressureEnd") as avg FROM gas_tanks gt INNER JOIN dives d ON d.id = gt."diveId" WHERE d."ownerId" = $1 AND "pressureStart" IS NOT NULL AND "pressureEnd" IS NOT NULL',
      [ownerId],
    );
    return res?.[0]?.avg ? Number(res[0].avg) : 0;
  }

  async getMyStats(userId: number): Promise<UserStats> {
    const [
      numberOfDives,
      totalImmersedTimeInMinutes,
      averageDepthPerMonth,
      shortestDiveTime,
      top5LongestDives,
      top5DeepestDives,
      divesOverRoles,
      divesOverEnvironments,
      divesOverTypes,
      multiTanksDivesCount,
      averageConsumptionBar,
    ] = await Promise.all([
      this.countDivesByOwnerId(userId),
      this.totalImmersedTimeInMinutes(userId),
      this.getAverageDepthPerMonth(userId),
      this.getShortestDiveTime(userId),
      this.getTop5LongestDives(userId),
      this.getTop5DeepestDives(userId),
      this.getDivesOverRoles(userId),
      this.getDivesOverEnvironments(userId),
      this.getDivesOverTypes(userId),
      this.getMultiTanksDivesCount(userId),
      this.getAverageConsumptionBar(userId),
    ]);

    return {
      numberOfDives,
      totalImmersedTimeInMinutes,
      averageDepthPerMonth,
      shortestDiveTime,
      top5LongestDives,
      top5DeepestDives,
      divesOverRoles,
      divesOverEnvironments,
      divesOverTypes,
      multiTanksDivesCount,
      averageConsumptionBar,
    };
  }
}
