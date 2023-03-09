import { Controller, Get, Query } from '@nestjs/common';
import { Purchase } from 'src/typeorm';
import { PurchasesService } from 'src/purchases/services/purchases/purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  async findPurchases(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('productId') productId?: number,
    @Query('productName') productName?: string,
  ): Promise<Purchase[]> {
    return this.purchasesService.findFilteredPurchases(dateFrom, dateTo, productId, productName);
  }
}