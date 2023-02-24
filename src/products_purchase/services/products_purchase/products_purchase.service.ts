import { Injectable } from '@nestjs/common';
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
  ) {}

  async create(product_purchase: ProductPurchase): Promise<ProductPurchase> {
    const { product, ...rest } = product_purchase;
    const productId = product.id; // Extract the id of the product object
    await this.productsService.purchaseProduct(productId, rest.amount);

    await this.productPurchaseRepository.save(product_purchase);
    return product_purchase;
  }
}


