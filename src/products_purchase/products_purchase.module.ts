import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsPurchaseController } from './controllers/products_purchase/products_purchase.controller';
import { ProductsPurchaseService } from './services/products_purchase/products_purchase.service';
import { ProductPurchase } from 'src/typeorm';
import { ProductsModule } from 'src/products/products.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProductPurchase]),
    ProductsModule 
  ],
  controllers: [ProductsPurchaseController],
  providers: [ProductsPurchaseService],
})
export class ProductsPurchaseModule {}