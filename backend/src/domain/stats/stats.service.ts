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

  async getGlobalStats(): Promise<GlobalStats> {
    const longestDive = await this.getLongestDive();
    const deepestDive = await this.getDeepestDive();
    const firstSubscribedUser = await this.getFirstSubscribedUser();
    const lastSubscribedUser = await this.getLastSubscribedUser();
    const mostActiveDiver = await this.getMostActiveDiver();
    const totalDives = await this.getTotalDives();
    const totalUsers = await this.getTotalUsers();

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
}
