import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from 'src/statistics/services/statistics/statistics.service';
import { ResultDto } from 'dto/result.dto';



@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getUserPurchaseStats(): Promise<ResultDto<{ userId: number; numPurchases: number; totalPrice: number }[]>> {
    try {
      const stats = await this.statisticsService.getUserPurchaseStats();
      return new ResultDto(true, null, stats);
    } catch (error) {
      return new ResultDto(false, null, null, error);
    }
  }

  @Get(':userId')
  async getUserPurchaseStatsByUserId(@Param('userId') userId: string): Promise<ResultDto<{ userId: number; numPurchases: number; totalPrice: number }>> {
    try {
      const stats = await this.statisticsService.getUserPurchaseStats();
      const userStats = stats.find(stat => stat.userId === parseInt(userId));
      if (userStats) {
        return new ResultDto(true, null, userStats);
      } else {
        return new ResultDto(false, `User with ID ${userId} not found`);
      }
    } catch (error) {
      return new ResultDto(false, null, null, error);
    }
  }
}