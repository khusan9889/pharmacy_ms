import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from 'src/statistics/services/statistics/statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getUserPurchaseStats(): Promise<{ userId: number; numPurchases: number; totalPrice: number }[]> {
    return this.statisticsService.getUserPurchaseStats();
  }

  @Get(':userId')
  async getUserPurchaseStatsByUserId(@Param('userId') userId: string): Promise<{ userId: number; numPurchases: number; totalPrice: number }> {
    const stats = await this.statisticsService.getUserPurchaseStats();
    return stats.find(stat => stat.userId === parseInt(userId));
  }
}