import { Controller, Post, Body } from '@nestjs/common';
import { ProductPurchase } from 'src/typeorm';
import { ProductsPurchaseService } from 'src/products_purchase/services/products_purchase/products_purchase.service';
import { ResultDto } from 'dto/result.dto';

@Controller('purchase')
export class ProductsPurchaseController {
    constructor(private readonly productsPurchaseService: ProductsPurchaseService) { }

    @Post()
    async create(@Body() productPurchases: ProductPurchase[]): Promise<ResultDto<ProductPurchase[]>> {
        const result = await this.productsPurchaseService.create(productPurchases);
        return new ResultDto(true, 'Successfully created product purchases', result);
    }
}