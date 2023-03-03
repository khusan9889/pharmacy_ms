//products_purchase.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/services/products/products.service';
import { ProductPurchase, Purchase } from 'src/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsPurchaseService {
  constructor(
    @InjectRepository(ProductPurchase)
    private readonly productPurchaseRepository: Repository<ProductPurchase>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly productsService: ProductsService,
  ) { }

  async create(product_purchases: any[]): Promise<ProductPurchase[]> {
    const productPurchaseRecords = [];
    let total_price = 0;

    const purchase = new Purchase();
    purchase.productPurchase = [];

    for (const product_purchase of product_purchases) {
      const product = await this.productsService.findOne(product_purchase.product);
      await this.productsService.purchaseProduct(product_purchase?.product, product_purchase.amount);
      const price = product.price;
      const productPurchase = {
        ...product_purchase,
        price,
      };
      productPurchaseRecords.push(productPurchase);

      const purchaseItem = new ProductPurchase();
      purchaseItem.purchase = purchase;
      purchaseItem.product = { id: product_purchase.product } as any;
      purchaseItem.amount = product_purchase.amount;
      purchaseItem.price = price;
      purchase.productPurchase.push(purchaseItem);

      total_price += price * product_purchase.amount;
    }

    purchase.total_price = total_price;

    // Save the Purchase and its associated ProductPurchase entities
    await this.purchaseRepository.save(purchase);

    return productPurchaseRecords;
  }
}

