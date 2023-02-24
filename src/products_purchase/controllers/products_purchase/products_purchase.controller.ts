import { Controller, Post, Body } from '@nestjs/common';
import { ProductPurchase } from 'src/typeorm';
import { ProductsPurchaseService } from 'src/products_purchase/services/products_purchase/products_purchase.service';

@Controller('products-purchase')
export class ProductsPurchaseController {
    constructor(
        private readonly productPurchaseService: ProductsPurchaseService
    ) { }

    @Post()
    async create(@Body() productPurchase: ProductPurchase): Promise<ProductPurchase> {
        return this.productPurchaseService.create(productPurchase)
    }

}