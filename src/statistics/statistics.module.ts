import { Module } from '@nestjs/common';
import { ProductPurchase, Purchase } from 'src/typeorm';
import { StatisticsController } from './controllers/statistics/statistics.controller';
import { StatisticsService } from './services/statistics/statistics.service';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, ProductPurchase]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule { }
