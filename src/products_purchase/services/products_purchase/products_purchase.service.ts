//products_purchase.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/services/products/products.service';
import { ProductPurchase } from 'src/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/typeorm';


@Injectable()
export class ProductsPurchaseService {
  constructor(
    @InjectRepository(ProductPurchase)
    private readonly productPurchaseRepository: Repository<ProductPurchase>,
    private readonly productsService: ProductsService,
    private readonly purchaseRepository: Repository<Purchase>,
  ) { }

  async create(product_purchases: any[]): Promise<ProductPurchase[]> {
    const productPurchaseRecords = [];

    // Calculate total price of all products
    let total_price = 0;
  
    for (const product_purchase of product_purchases) {
      const product = await this.productsService.findOne(product_purchase.product);
      await this.productsService.purchaseProduct(product_purchase?.product, product_purchase.amount);
      const price = product.price;
      const productPurchase = {
        ...product_purchase,
        price,
      };
      productPurchaseRecords.push(productPurchase);
      total_price += productPurchase.amount * price;
    }

    // Create Purchase record and set its attributes
    const purchase = new Purchase();
    purchase.total_price = total_price;

    // Save the purchase record in the database
    const savedPurchase = await this.purchaseRepository.save(purchase);

    // Add the saved Purchase record's id to each product purchase record
    productPurchaseRecords.forEach(productPurchase => {
      productPurchase.purchase = savedPurchase;
    });
  
    await this.productPurchaseRepository.save(productPurchaseRecords);
    return productPurchaseRecords;
  }
}

