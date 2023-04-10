import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Purchase } from 'src/typeorm';
import { PurchasesService } from 'src/purchases/services/purchases/purchases.service';
import { ResultDto } from 'dto/result.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findPurchases(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('productId') productId?: number,
    @Query('productName') productName?: string,
  ): Promise<ResultDto<Purchase[]>> {
    try {
      const purchases = await this.purchasesService.findFilteredPurchases(dateFrom, dateTo, productId, productName);
      return new ResultDto(true, 'OK', purchases);
    } catch (error) {
      return new ResultDto(false, 'Error', null, error);
    }
  }
}
