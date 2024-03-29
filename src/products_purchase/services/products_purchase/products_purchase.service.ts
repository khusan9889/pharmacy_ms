//products_purchase.service.ts
import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/services/products/products.service';
import { Product, ProductPurchase, Purchase } from 'src/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from './JwtAuthGuard';

@Injectable()
export class ProductsPurchaseService {
  constructor(
    @InjectRepository(ProductPurchase)
    private readonly productPurchaseRepository: Repository<ProductPurchase>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly productsService: ProductsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  async create(product_purchases: any[]): Promise<ProductPurchase[]> {
    const productPurchaseRecords = [];
    let total_price = 0;
    const purchase = new Purchase();
    purchase.productPurchase = [];
  
    for (const product_purchase of product_purchases) {
      const product = await this.productsService.findOne(product_purchase.product);
      
      // Calculate total product amount
      let total_product_amount = product_purchase.amount;
      if (product.package_type) {
        if (product_purchase.per_box && product_purchase.package_amount) {
          total_product_amount = product_purchase.per_box * product_purchase.package_amount;
        } else if (product_purchase.package_amount) {
          total_product_amount = product_purchase.package_amount;
        }
      }
      
      // Subtract package amount from total amount
      // const condition = product.amount % product.per_box==0
      // let update_package_am = 0
      // if (condition) {
      //   const total_box = product.amount % product.per_box
      //   update_package_am = product.package_amount - total_box
      //   product.package_amount = update_package_am
        
      // }

      
  
      await this.productsService.purchaseProduct(product_purchase?.product, total_product_amount);
      const price = product.price;
      const productPurchase = {
        ...product_purchase,
        price,
      };
      productPurchaseRecords.push(productPurchase);
  
      const purchaseItem = new ProductPurchase();
      // Set the purchase ID for the product purchase item
      purchaseItem.purchase = purchase;
      purchaseItem.product = { id: product_purchase.product } as any;
      purchaseItem.amount = product_purchase.amount;
      purchaseItem.price = price;
      purchase.productPurchase.push(purchaseItem);
  
      total_price += price * product_purchase.amount;
    }
  
    purchase.total_price = total_price;
    // Save the purchase to get the ID
    const savedPurchase = await this.purchaseRepository.save(purchase);
    // Set the purchase ID for each product purchase item
    purchase.productPurchase.forEach((item) => {
        item.purchase = savedPurchase;
    });
    // Save the product purchase items with the updated purchase IDs
    await this.productPurchaseRepository.save(purchase.productPurchase);
  
    return productPurchaseRecords;
  }
}

