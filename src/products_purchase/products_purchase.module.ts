import { Module } from '@nestjs/common';
import { ProductsPurchaseController } from './controllers/products_purchase/products_purchase.controller';
import { ProductsPurchaseService } from './services/products_purchase/products_purchase.service';

@Module({
  controllers: [ProductsPurchaseController],
  providers: [ProductsPurchaseService]
})
export class ProductsPurchaseModule {}
