import { Controller, Get, Query } from '@nestjs/common';
import { PurchasesService } from 'src/purchases/services/purchases/purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  findAll(@Query('date_from') dateFrom: string, @Query('date_to') dateTo: string, @Query('productId') productId: number, @Query('productName') productName: string) {
    return this.purchasesService.findFilteredPurchases(dateFrom, dateTo,productId, productName);
  }
}