//products_purchase.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/services/products/products.service';
import { ProductPurchase } from 'src/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsPurchaseService {
  constructor(
    @InjectRepository(ProductPurchase)
    private readonly productPurchaseRepository: Repository<ProductPurchase>,
    private readonly productsService: ProductsService,
  ) { }

  async create(product_purchases: any[]): Promise<ProductPurchase[]> {
    const productPurchaseRecords = [];
  
    for (const product_purchase of product_purchases) {
      const product = await this.productsService.findOne(product_purchase.product);
      await this.productsService.purchaseProduct(product_purchase?.product, product_purchase.amount);
      const price = product.price;
      const productPurchase = {
        ...product_purchase,
        price,
      };
      productPurchaseRecords.push(productPurchase);
    }
  
    await this.productPurchaseRepository.save(productPurchaseRecords);
    return productPurchaseRecords;
  }
}
