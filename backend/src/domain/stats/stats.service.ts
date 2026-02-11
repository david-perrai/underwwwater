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
} from './entities/stats';

@Injectable()
export class StatsService {
  constructor(private dataSource: DataSource) {}

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
    return this.dataSource.query(
      'SELECT COUNT(*) FROM dives WHERE "ownerId" = $1',
      [ownerId],
    );
  }

  private async totalImmersedTimeInMinutes(ownerId: number): Promise<number> {
    return this.dataSource.query(
      'SELECT SUM("totalTime") FROM dives WHERE "ownerId" = $1',
      [ownerId],
    );
  }

  private async getAverageDepthPerMonth(
    userId: number,
  ): Promise<AverageDepthPerMonth[]> {
    return this.dataSource.query(
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

  async getMyStats(userId: number): Promise<UserStats> {
    const [numberOfDives, totalImmersedTimeInMinutes, averageDepthPerMonth] =
      await Promise.all([
        this.countDivesByOwnerId(userId),
        this.totalImmersedTimeInMinutes(userId),
        this.getAverageDepthPerMonth(userId),
      ]);

    return {
      numberOfDives: numberOfDives?.[0]?.count || 0,
      totalImmersedTimeInMinutes: totalImmersedTimeInMinutes?.[0]?.sum || 0,
      averageDepthPerMonth,
    };
  }
}
