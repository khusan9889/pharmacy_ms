import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { StatisticsService } from 'src/statistics/services/statistics/statistics.service';
import { ResultDto } from 'dto/result.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';


@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService) { }
  
  @UseGuards(JwtAuthGuard)
  @Get('common-products')
  async getCommonProductsStats(
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,

  ): Promise<ResultDto<{ productId: number; productName: string; count: number; totalPrice?: number }[]>> {
    try {
      const stats = await this.statisticsService.getMostCommonProducts(dateFrom, dateTo, order);
      return new ResultDto(true, null, stats);
    } catch (error) {
      return new ResultDto(false, null, null, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('category-stats')
  async getCategorySalesStats(
      @Query('order') order: 'ASC' | 'DESC' = 'DESC',
      @Query('dateFrom') dateFrom: string,
      @Query('dateTo') dateTo: string,
  ): Promise<ResultDto<{categoryId: number; categoryName: string; numProductsSold: number; totalPrice?: number}[]>> {
    try {
      const stats = await this.statisticsService.getCategorySalesStats(dateFrom, dateTo, order);
      return new ResultDto(true, null, stats);
    } catch(error) {
      return new ResultDto(false, null, null, error);
    }   
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUserPurchaseStatsByUserId(@Param('userId') userId: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string): Promise<ResultDto<{ userId: number; numPurchases: number; totalPrice: number }>> {
    try {
      const stats = await this.statisticsService.getUserPurchaseStats(dateFrom, dateTo);
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserPurchaseStats(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ): Promise<ResultDto<{ userId: number; numPurchases: number; totalPrice: number }[]>> {
    try {
      const stats = await this.statisticsService.getUserPurchaseStats(dateFrom, dateTo);
      return new ResultDto(true, null, stats);
    } catch (error) {
      return new ResultDto(false, null, null, error);
    }
  }

}

