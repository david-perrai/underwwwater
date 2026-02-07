import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GlobalStats } from './entities/stats';

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
}
