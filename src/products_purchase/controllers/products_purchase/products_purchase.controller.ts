import { Controller, Post, Body } from '@nestjs/common';
import { ProductPurchase } from 'src/typeorm';
import { ProductsPurchaseService } from 'src/products_purchase/services/products_purchase/products_purchase.service';

@Controller('purchase')
export class ProductsPurchaseController {
    constructor(private readonly productsPurchaseService: ProductsPurchaseService) { }

    @Post()
    async create(@Body() productPurchases: ProductPurchase[]): Promise<ProductPurchase[]> {
        return this.productsPurchaseService.create(productPurchases);
    }
}