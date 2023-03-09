import { Module } from '@nestjs/common';
import { StatisticsController } from './controllers/statistics/statistics.controller';
import { StatisticsService } from './services/statistics/statistics.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
