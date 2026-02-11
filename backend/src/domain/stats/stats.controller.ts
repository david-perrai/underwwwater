import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GlobalStats, UserStats } from './entities/stats';
import { AuthenticatedUser } from '@/auth/decorators/authenticated-user.decorator';
import type { IAuthenticatedUser } from '@/auth/types/authenticated-user';

@ApiTags('stats')
@Controller('stats')
@ApiBearerAuth()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({ summary: 'Get global stats' })
  @ApiResponse({
    status: 200,
    description: 'Global stats',
    type: GlobalStats,
  })
  @Get()
  getGlobalStats() {
    return this.statsService.getGlobalStats();
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get my stats' })
  @ApiResponse({
    status: 200,
    description: 'My stats',
    type: UserStats,
  })
  getMyStats(@AuthenticatedUser() user: IAuthenticatedUser) {
    return this.statsService.getMyStats(user.id);
  }
}
