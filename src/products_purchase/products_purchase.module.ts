import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsPurchaseController } from './controllers/products_purchase/products_purchase.controller';
import { ProductsPurchaseService } from './services/products_purchase/products_purchase.service';
import { ProductPurchase, Purchase } from '../typeorm'; // Import the entities from typeorm
import { ProductsModule } from 'src/products/products.module';
import { Repository } from 'typeorm';
import { PurchasesModule } from 'src/purchases/purchases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductPurchase, Purchase]),
    ProductsModule, PurchasesModule,
  ],
  controllers: [ProductsPurchaseController],
  providers: [ProductsPurchaseService, Repository],
})
export class ProductsPurchaseModule {}