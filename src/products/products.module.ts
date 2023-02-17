import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
